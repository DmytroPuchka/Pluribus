/**
 * Upload Service for Cloudinary
 * Handles image uploads, transformations, and deletions
 */

import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

interface UploadOptions {
  folder: string;
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
  format?: string;
}

class UploadService {
  /**
   * Upload a single image to Cloudinary
   */
  async uploadImage(
    filePath: string,
    options: UploadOptions
  ): Promise<{ url: string; publicId: string }> {
    try {
      const result: UploadApiResponse = await cloudinary.uploader.upload(filePath, {
        folder: options.folder,
        transformation: [
          {
            width: options.width || 1200,
            height: options.height || 1200,
            crop: options.crop || 'limit',
          },
          {
            quality: options.quality || 'auto:good',
            fetch_format: options.format || 'auto',
          },
        ],
      });

      // Delete local file after successful upload
      await unlinkAsync(filePath);

      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      // Delete local file even if upload failed
      if (fs.existsSync(filePath)) {
        await unlinkAsync(filePath);
      }
      throw error;
    }
  }

  /**
   * Upload multiple images to Cloudinary
   */
  async uploadMultipleImages(
    filePaths: string[],
    options: UploadOptions
  ): Promise<Array<{ url: string; publicId: string }>> {
    const uploadPromises = filePaths.map((filePath) =>
      this.uploadImage(filePath, options)
    );
    return Promise.all(uploadPromises);
  }

  /**
   * Upload avatar with face detection cropping
   */
  async uploadAvatar(
    filePath: string,
    userId: string
  ): Promise<{ url: string; publicId: string }> {
    return this.uploadImage(filePath, {
      folder: `pluribus/users/${userId}/avatar`,
      width: 400,
      height: 400,
      crop: 'fill',
      quality: 'auto:best',
    });
  }

  /**
   * Upload product photo
   */
  async uploadProductPhoto(
    filePath: string,
    productId: string
  ): Promise<{ url: string; publicId: string }> {
    return this.uploadImage(filePath, {
      folder: `pluribus/products/${productId}`,
      width: 1200,
      height: 1200,
      crop: 'limit',
      quality: 'auto:good',
    });
  }

  /**
   * Delete image from Cloudinary by public_id
   */
  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      throw error;
    }
  }

  /**
   * Delete multiple images from Cloudinary
   */
  async deleteMultipleImages(publicIds: string[]): Promise<void> {
    const deletePromises = publicIds.map((publicId) => this.deleteImage(publicId));
    await Promise.all(deletePromises);
  }

  /**
   * Extract public_id from Cloudinary URL
   */
  extractPublicId(url: string): string | null {
    try {
      const regex = /\/v\d+\/(.+)\.\w{3,4}$/;
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch (error) {
      console.error('Error extracting public_id from URL:', error);
      return null;
    }
  }
}

export default new UploadService();
