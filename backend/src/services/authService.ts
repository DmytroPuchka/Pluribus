import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateTokens, verifyRefreshToken, TokenPayload } from '../utils/jwt';
import { UnauthorizedError, ConflictError } from '../middleware/errorHandler';
import { UserRole } from '../types';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
  country: string;
  city: string;
  phone?: string;
  bio?: string;
  deliveryCountries?: string[];
}

export interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  /**
   * Register new user
   */
  async register(data: RegisterData) {
    const { email, password, name, role, country, city, phone, bio, deliveryCountries } = data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role.toUpperCase() as 'BUYER' | 'SELLER' | 'ADMIN',
        country,
        city,
        phone,
        bio,
        deliveryCountries: deliveryCountries || [],
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        country: true,
        city: true,
        phone: true,
        bio: true,
        avatar: true,
        deliveryCountries: true,
        emailVerified: true,
        phoneVerified: true,
        idVerified: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    });

    // Save refresh token to database
    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      user,
      tokens,
    };
  }

  /**
   * Login user
   */
  async login(data: LoginData) {
    const { email, password } = data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check if account is active
    if (!user.isActive || user.isSuspended) {
      throw new UnauthorizedError('Account is inactive or suspended');
    }

    // Check if user has a password (OAuth users don't have passwords)
    if (!user.password) {
      throw new UnauthorizedError('This account uses Google Sign In. Please sign in with Google.');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    });

    // Save refresh token to database
    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string) {
    // Verify refresh token
    let payload: TokenPayload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    // Check if refresh token exists in database
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenRecord) {
      throw new UnauthorizedError('Refresh token not found');
    }

    // Check if token is expired
    if (tokenRecord.expiresAt < new Date()) {
      await prisma.refreshToken.delete({
        where: { id: tokenRecord.id },
      });
      throw new UnauthorizedError('Refresh token expired');
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || !user.isActive || user.isSuspended) {
      throw new UnauthorizedError('User not found or inactive');
    }

    // Generate new tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    });

    // Delete old refresh token
    await prisma.refreshToken.delete({
      where: { id: tokenRecord.id },
    });

    // Save new refresh token
    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return tokens;
  }

  /**
   * Logout user (invalidate refresh token)
   */
  async logout(refreshToken: string) {
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (tokenRecord) {
      await prisma.refreshToken.delete({
        where: { id: tokenRecord.id },
      });
    }

    return { message: 'Logged out successfully' };
  }
}

export default new AuthService();
