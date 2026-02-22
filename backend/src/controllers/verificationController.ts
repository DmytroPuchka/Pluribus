import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyEmailVerificationToken, generateEmailVerificationToken } from '../utils/generateToken';
import { sendVerificationEmail, sendWelcomeEmail } from '../services/emailService';

const prisma = new PrismaClient();

/**
 * Verify email address
 * POST /api/v1/auth/verify-email
 */
export async function verifyEmail(req: Request, res: Response): Promise<void> {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ error: 'Verification token is required' });
      return;
    }

    // Verify token
    const decoded = verifyEmailVerificationToken(token);

    if (!decoded) {
      res.status(400).json({
        error: 'Invalid or expired verification token',
        code: 'INVALID_TOKEN',
      });
      return;
    }

    // Find user by email (userId in token contains email)
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND',
      });
      return;
    }

    // Check if email already verified
    if (user.emailVerified) {
      res.status(200).json({
        message: 'Email already verified',
        code: 'ALREADY_VERIFIED',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: true,
        },
      });
      return;
    }

    // Check if token matches the one stored
    if (user.emailVerificationToken !== token) {
      res.status(400).json({
        error: 'Invalid verification token',
        code: 'INVALID_TOKEN',
      });
      return;
    }

    // Check if token expired
    if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()) {
      res.status(400).json({
        error: 'Verification token has expired',
        code: 'TOKEN_EXPIRED',
      });
      return;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date(),
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    });

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't fail the request if welcome email fails
    }

    res.status(200).json({
      message: 'Email verified successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        emailVerified: updatedUser.emailVerified,
        emailVerifiedAt: updatedUser.emailVerifiedAt,
      },
    });
  } catch (error: any) {
    console.error('Email verification error:', error);
    res.status(500).json({
      error: 'Failed to verify email',
      details: error.message,
    });
  }
}

/**
 * Resend verification email
 * POST /api/v1/auth/resend-verification
 */
export async function resendVerificationEmail(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not for security
      res.status(200).json({
        message: 'If an account exists with this email, a verification link will be sent',
      });
      return;
    }

    // Check if already verified
    if (user.emailVerified) {
      res.status(400).json({
        error: 'Email already verified',
        code: 'ALREADY_VERIFIED',
      });
      return;
    }

    // Check rate limiting (max 3 emails per hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (user.updatedAt > oneHourAgo) {
      // Simple rate limiting based on updatedAt
      // In production, use a proper rate limiting solution
      const timeSinceLastUpdate = Date.now() - user.updatedAt.getTime();
      if (timeSinceLastUpdate < 60 * 1000) {
        // 60 seconds minimum between resends
        res.status(429).json({
          error: 'Please wait at least 60 seconds before requesting another verification email',
          code: 'RATE_LIMIT_EXCEEDED',
        });
        return;
      }
    }

    // Generate new verification token (pass email as userId for consistency)
    const verificationToken = generateEmailVerificationToken(user.email, user.email);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user with new token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: verificationToken,
        emailVerificationExpires: expiresAt,
      },
    });

    // Send verification email
    await sendVerificationEmail(user.email, user.name, verificationToken);

    res.status(200).json({
      message: 'Verification email sent successfully',
    });
  } catch (error: any) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      error: 'Failed to resend verification email',
      details: error.message,
    });
  }
}

/**
 * Check verification status
 * GET /api/v1/auth/verification-status
 */
export async function checkVerificationStatus(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        emailVerifiedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({
      emailVerified: user.emailVerified,
      emailVerifiedAt: user.emailVerifiedAt,
    });
  } catch (error: any) {
    console.error('Check verification status error:', error);
    res.status(500).json({
      error: 'Failed to check verification status',
      details: error.message,
    });
  }
}
