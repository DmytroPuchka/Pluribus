/**
 * Passport Configuration for Google OAuth
 */

import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Configure Google OAuth Strategy
 */
export const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,
        scope: ['profile', 'email'],
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        try {
          // Extract user data from Google profile
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName || profile.name?.givenName || 'Google User';
          const googleId = profile.id;
          const avatar = profile.photos?.[0]?.value;

          if (!email) {
            return done(new Error('No email found in Google profile'), undefined);
          }

          // Check if user already exists with this Google ID
          let user = await prisma.user.findUnique({
            where: { googleId },
          });

          if (user) {
            // User exists with Google ID - login
            await prisma.user.update({
              where: { id: user.id },
              data: { lastLoginAt: new Date() },
            });
            return done(null, user);
          }

          // Check if user exists with this email (local account)
          user = await prisma.user.findUnique({
            where: { email },
          });

          if (user) {
            // User exists with email but no Google ID
            // Link Google account to existing user
            user = await prisma.user.update({
              where: { id: user.id },
              data: {
                googleId,
                provider: 'google',
                emailVerified: true,
                avatar: avatar || user.avatar,
                lastLoginAt: new Date(),
              },
            });
            return done(null, user);
          }

          // User doesn't exist - create new user
          // Note: country and city will be filled later via onboarding modal
          user = await prisma.user.create({
            data: {
              email,
              name,
              googleId,
              provider: 'google',
              avatar,
              emailVerified: true,
              role: 'BUYER', // Default role, can be changed during onboarding
              isActive: true,
              lastLoginAt: new Date(),
            },
          });

          return done(null, user);
        } catch (error) {
          console.error('Google OAuth error:', error);
          return done(error as Error, undefined);
        }
      }
    )
  );

  // Serialize user for session (not used with JWT, but required by Passport)
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session (not used with JWT, but required by Passport)
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
