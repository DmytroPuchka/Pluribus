import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendPasswordResetEmail } from '../services/emailService';

const prisma = new PrismaClient();

/**
 * Request password reset
 * POST /api/v1/auth/forgot-password
 */
export async function requestPasswordReset(req: Request, res: Response): Promise<void> {
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

    // Always return success for security (don't reveal if user exists)
    if (!user) {
      res.status(200).json({
        message: 'If an account exists with this email, a password reset link will be sent',
      });
      return;
    }

    // Generate reset token (expires in 1 hour)
    const resetToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        type: 'password_reset',
      },
      process.env.JWT_ACCESS_SECRET || 'fallback-secret',
      { expiresIn: '1h' }
    );

    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        // We'll need to add these fields to the schema
        passwordResetToken: resetToken,
        passwordResetExpires: resetTokenExpires,
      },
    });

    // Send password reset email
    await sendPasswordResetEmail(user.email, user.name, resetToken);

    res.status(200).json({
      message: 'If an account exists with this email, a password reset link will be sent',
    });
  } catch (error: any) {
    console.error('Password reset request error:', error);
    res.status(500).json({
      error: 'Failed to process password reset request',
      details: error.message,
    });
  }
}

/**
 * Reset password with token
 * POST /api/v1/auth/reset-password
 */
export async function resetPassword(req: Request, res: Response): Promise<void> {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ error: 'Token and new password are required' });
      return;
    }

    // Validate password strength
    if (newPassword.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long' });
      return;
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'fallback-secret');
    } catch (error) {
      res.status(400).json({
        error: 'Invalid or expired reset token',
        code: 'INVALID_TOKEN',
      });
      return;
    }

    if (decoded.type !== 'password_reset') {
      res.status(400).json({
        error: 'Invalid token type',
        code: 'INVALID_TOKEN',
      });
      return;
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND',
      });
      return;
    }

    // Check if token matches and hasn't expired
    if (user.passwordResetToken !== token) {
      res.status(400).json({
        error: 'Invalid reset token',
        code: 'INVALID_TOKEN',
      });
      return;
    }

    if (user.passwordResetExpires && user.passwordResetExpires < new Date()) {
      res.status(400).json({
        error: 'Reset token has expired',
        code: 'TOKEN_EXPIRED',
      });
      return;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    res.status(200).json({
      message: 'Password reset successfully',
    });
  } catch (error: any) {
    console.error('Password reset error:', error);
    res.status(500).json({
      error: 'Failed to reset password',
      details: error.message,
    });
  }
}
