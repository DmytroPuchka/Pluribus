import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import authService from '../services/authService';
import { sendSuccess } from '../utils/response';
import { generateTokens } from '../utils/jwt';
import { UserRole } from '../types';

export class AuthController {
  /**
   * Register new user
   * POST /api/v1/auth/register
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);

      sendSuccess(
        res,
        {
          user: result.user,
          message: result.message,
          requiresEmailVerification: result.requiresEmailVerification,
        },
        201
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login user
   * POST /api/v1/auth/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);

      sendSuccess(res, {
        user: result.user,
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Refresh access token
   * POST /api/v1/auth/refresh
   */
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshToken(refreshToken);

      sendSuccess(res, {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Logout user
   * POST /api/v1/auth/logout
   */
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.logout(refreshToken);

      sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Google OAuth - Initiate authentication
   * GET /api/v1/auth/google
   */
  googleAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  }

  /**
   * Google OAuth - Callback handler
   * GET /api/v1/auth/google/callback
   */
  async googleCallback(req: Request, res: Response, next: NextFunction) {
    console.log('🔵 Google callback initiated');
    passport.authenticate('google', { session: false }, async (err: any, user: any) => {
      try {
        console.log('🔵 Passport authenticate callback', {
          hasError: !!err,
          hasUser: !!user,
          error: err?.message
        });

        if (err || !user) {
          console.error('❌ Google auth failed:', err);
          // Redirect to frontend with error
          return res.redirect(
            `${process.env.CORS_ORIGIN}/login?error=google_auth_failed`
          );
        }

        console.log('✅ User authenticated:', {
          userId: user.id,
          email: user.email,
          hasCountry: !!user.country,
          hasCity: !!user.city
        });

        // Generate JWT tokens
        const tokens = generateTokens({
          userId: user.id,
          email: user.email,
          role: user.role as UserRole,
        });

        console.log('✅ Tokens generated');

        // Check if user needs onboarding (no country/city)
        const needsOnboarding = !user.country || !user.city;

        // Redirect to frontend with tokens and onboarding flag
        const redirectUrl = needsOnboarding
          ? `${process.env.CORS_ORIGIN}/onboarding?token=${tokens.accessToken}&refresh=${tokens.refreshToken}`
          : `${process.env.CORS_ORIGIN}/auth/callback?token=${tokens.accessToken}&refresh=${tokens.refreshToken}`;

        console.log('🔵 Redirecting to:', redirectUrl.split('?')[0], { needsOnboarding });
        res.redirect(redirectUrl);
      } catch (error) {
        console.error('❌ Google callback error:', error);
        res.redirect(`${process.env.CORS_ORIGIN}/login?error=auth_failed`);
      }
    })(req, res, next);
  }
}

export default new AuthController();
