/**
 * Upload Routes
 * Endpoints for file uploads
 */

import express from 'express';
import uploadController from '../controllers/uploadController';
import { authenticate } from '../middleware/auth';
import { uploadAvatar, uploadProductPhotos, uploadSingle } from '../middleware/upload';

const router = express.Router();

/**
 * Upload user avatar
 * POST /api/v1/upload/avatar
 * @protected - requires authentication
 */
router.post('/avatar', authenticate, uploadAvatar, uploadController.uploadAvatar);

/**
 * Upload product photos
 * POST /api/v1/upload/product-photos
 * @protected - requires authentication
 */
router.post(
  '/product-photos',
  authenticate,
  uploadProductPhotos,
  uploadController.uploadProductPhotos
);

/**
 * Upload single image (generic)
 * POST /api/v1/upload/image
 * @protected - requires authentication
 */
router.post('/image', authenticate, uploadSingle, uploadController.uploadImage);

/**
 * Delete image from Cloudinary
 * DELETE /api/v1/upload/image
 * @protected - requires authentication
 */
router.delete('/image', authenticate, uploadController.deleteImage);

export default router;
