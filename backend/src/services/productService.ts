import prisma from '../config/database';
import { NotFoundError, ForbiddenError } from '../middleware/errorHandler';

export interface CreateProductData {
  title: string;
  description: string;
  photos: string[];
  price: number;
  currency?: string;
  category: 'ELECTRONICS' | 'FASHION' | 'HOME' | 'BEAUTY' | 'SPORTS' | 'BOOKS' | 'TOYS' | 'FOOD' | 'OTHER';
  tags?: string[];
  stockQuantity: number;
}

export interface UpdateProductData {
  title?: string;
  description?: string;
  photos?: string[];
  price?: number;
  currency?: string;
  category?: 'ELECTRONICS' | 'FASHION' | 'HOME' | 'BEAUTY' | 'SPORTS' | 'BOOKS' | 'TOYS' | 'FOOD' | 'OTHER';
  tags?: string[];
  stockQuantity?: number;
  isAvailable?: boolean;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sellerId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ProductService {
  /**
   * Create new product (seller only)
   */
  async createProduct(sellerId: string, data: CreateProductData) {
    // Check if user exists and upgrade to seller if needed
    const user = await prisma.user.findUnique({
      where: { id: sellerId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Auto-upgrade to SELLER role if creating first product
    if (user.role === 'BUYER') {
      await prisma.user.update({
        where: { id: sellerId },
        data: { role: 'SELLER' },
      });
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        sellerId,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
            country: true,
            city: true,
          },
        },
      },
    });

    return product;
  }

  /**
   * Get all products with filters
   */
  async getProducts(filters: ProductFilters) {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      search,
      sellerId,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const skip = (page - 1) * limit;

    const where: any = {};

    // Only filter by isAvailable if sellerId is NOT provided
    // When sellerId is provided (seller viewing their own products), show all products
    if (!sellerId) {
      where.isAvailable = true;
    }

    if (category) where.category = category;
    if (sellerId) where.sellerId = sellerId;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = minPrice;
      if (maxPrice) where.price.lte = maxPrice;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          seller: {
            select: {
              id: true,
              name: true,
              avatar: true,
              country: true,
              city: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  /**
   * Get product by ID
   */
  async getProductById(productId: string) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true,
            country: true,
            city: true,
            emailVerified: true,
            phoneVerified: true,
            idVerified: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  /**
   * Update product (seller only)
   */
  async updateProduct(productId: string, sellerId: string, data: UpdateProductData) {
    // Check if product exists and belongs to seller
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new NotFoundError('Product not found');
    }

    if (existingProduct.sellerId !== sellerId) {
      throw new ForbiddenError('You can only update your own products');
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data,
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
            country: true,
            city: true,
          },
        },
      },
    });

    return product;
  }

  /**
   * Delete product (seller only)
   */
  async deleteProduct(productId: string, sellerId: string) {
    // Check if product exists and belongs to seller
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (product.sellerId !== sellerId) {
      throw new ForbiddenError('You can only delete your own products');
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return { message: 'Product deleted successfully' };
  }
}

export default new ProductService();
