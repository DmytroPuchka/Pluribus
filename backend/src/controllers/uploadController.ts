/**
 * Upload Controller
 * Handles file upload endpoints
 */

import { Request, Response, NextFunction } from 'express';
import uploadService from '../services/uploadService';
import { sendSuccess } from '../utils/response';
import { BadRequestError } from '../utils/errors';
import { JwtPayload } from '../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UploadController {
  /**
   * Upload user avatar
   * POST /api/v1/upload/avatar
   */
  async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestError('No file uploaded');
      }

      const userId = (req.user as JwtPayload).userId;

      // Get current user to check for old avatar
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { avatar: true },
      });

      // Delete old avatar from Cloudinary if exists
      if (user?.avatar) {
        const publicId = uploadService.extractPublicId(user.avatar);
        if (publicId) {
          await uploadService.deleteImage(publicId).catch((err) =>
            console.error('Failed to delete old avatar:', err)
          );
        }
      }

      // Upload new avatar
      const result = await uploadService.uploadAvatar(req.file.path, userId);

      // Update user avatar in database
      await prisma.user.update({
        where: { id: userId },
        data: { avatar: result.url },
      });

      sendSuccess(res, {
        url: result.url,
        message: 'Avatar uploaded successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upload product photos
   * POST /api/v1/upload/product-photos
   */
  async uploadProductPhotos(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        throw new BadRequestError('No files uploaded');
      }

      const { productId } = req.body;

      if (!productId) {
        throw new BadRequestError('Product ID is required');
      }

      // Upload all photos
      const filePaths = req.files.map((file) => file.path);
      const results = await uploadService.uploadMultipleImages(filePaths, {
        folder: `pluribus/products/${productId}`,
        width: 1200,
        height: 1200,
        crop: 'limit',
      });

      const photoUrls = results.map((r) => r.url);

      sendSuccess(res, {
        urls: photoUrls,
        count: photoUrls.length,
        message: 'Photos uploaded successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upload single image (generic)
   * POST /api/v1/upload/image
   */
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestError('No file uploaded');
      }

      const { folder = 'pluribus/misc' } = req.body;
      const userId = (req.user as JwtPayload).userId;

      const result = await uploadService.uploadImage(req.file.path, {
        folder: `${folder}/${userId}`,
      });

      sendSuccess(res, {
        url: result.url,
        publicId: result.publicId,
        message: 'Image uploaded successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete image from Cloudinary
   * DELETE /api/v1/upload/image
   */
  async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { url } = req.body;

      if (!url) {
        throw new BadRequestError('Image URL is required');
      }

      const publicId = uploadService.extractPublicId(url);

      if (!publicId) {
        throw new BadRequestError('Invalid Cloudinary URL');
      }

      await uploadService.deleteImage(publicId);

      sendSuccess(res, {
        message: 'Image deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UploadController();
