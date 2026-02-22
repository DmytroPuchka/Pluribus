import jwt from 'jsonwebtoken';

/**
 * Generate email verification token
 */
export function generateEmailVerificationToken(userId: string, email: string): string {
  const secret = process.env.EMAIL_VERIFICATION_SECRET || process.env.JWT_ACCESS_SECRET || 'fallback-secret';
  const expiresIn = process.env.EMAIL_VERIFICATION_EXPIRES_IN || '24h';

  return jwt.sign(
    {
      userId,
      email,
      type: 'email_verification',
    },
    secret,
    { expiresIn } as jwt.SignOptions
  );
}

/**
 * Verify email verification token
 */
export function verifyEmailVerificationToken(token: string): { userId: string; email: string } | null {
  try {
    const secret = process.env.EMAIL_VERIFICATION_SECRET || process.env.JWT_ACCESS_SECRET || 'fallback-secret';
    const decoded = jwt.verify(token, secret) as any;

    if (decoded.type !== 'email_verification') {
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Generate password reset token
 */
export function generatePasswordResetToken(userId: string, email: string): string {
  const secret = process.env.JWT_ACCESS_SECRET || 'fallback-secret';

  return jwt.sign(
    {
      userId,
      email,
      type: 'password_reset',
    },
    secret,
    { expiresIn: '1h' } as jwt.SignOptions
  );
}

/**
 * Verify password reset token
 */
export function verifyPasswordResetToken(token: string): { userId: string; email: string } | null {
  try {
    const secret = process.env.JWT_ACCESS_SECRET || 'fallback-secret';
    const decoded = jwt.verify(token, secret) as any;

    if (decoded.type !== 'password_reset') {
      return null;
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    return null;
  }
}
