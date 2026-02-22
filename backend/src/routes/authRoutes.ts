import { Router } from 'express';
import authController from '../controllers/authController';
import { validate } from '../utils/validation';
import { registerSchema, loginSchema, refreshTokenSchema } from '../validators/authValidators';
import { authRateLimiter } from '../config/rateLimiter';
import { authenticate } from '../middleware/auth';
import {
  verifyEmail,
  resendVerificationEmail,
  checkVerificationStatus,
} from '../controllers/verificationController';
import {
  requestPasswordReset,
  resetPassword,
} from '../controllers/passwordResetController';

const router = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post(
  '/register',
  authRateLimiter,
  validate(registerSchema),
  authController.register.bind(authController)
);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  '/login',
  authRateLimiter,
  validate(loginSchema),
  authController.login.bind(authController)
);

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post(
  '/refresh',
  validate(refreshTokenSchema),
  authController.refresh.bind(authController)
);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Public
 */
router.post(
  '/logout',
  validate(refreshTokenSchema),
  authController.logout.bind(authController)
);

/**
 * @route   GET /api/v1/auth/google
 * @desc    Initiate Google OAuth authentication
 * @access  Public
 */
router.get('/google', authController.googleAuth.bind(authController));

/**
 * @route   GET /api/v1/auth/google/callback
 * @desc    Google OAuth callback handler
 * @access  Public
 */
router.get('/google/callback', authController.googleCallback.bind(authController));

/**
 * @route   POST /api/v1/auth/verify-email
 * @desc    Verify email address with token
 * @access  Public
 */
router.post('/verify-email', authRateLimiter, verifyEmail);

/**
 * @route   POST /api/v1/auth/resend-verification
 * @desc    Resend verification email
 * @access  Public
 */
router.post('/resend-verification', authRateLimiter, resendVerificationEmail);

/**
 * @route   GET /api/v1/auth/verification-status
 * @desc    Check email verification status
 * @access  Private
 */
router.get('/verification-status', authenticate, checkVerificationStatus);

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Request password reset email
 * @access  Public
 */
router.post('/forgot-password', authRateLimiter, requestPasswordReset);

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', authRateLimiter, resetPassword);

export default router;
