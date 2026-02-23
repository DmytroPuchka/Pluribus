/**
 * Cloudinary Configuration
 * Media storage and transformation service
 */

import { v2 as cloudinary } from 'cloudinary';

/**
 * Configure Cloudinary with environment variables
 */
export const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log('✅ Cloudinary configured successfully');
};

export default cloudinary;
