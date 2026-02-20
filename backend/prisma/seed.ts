/**
 * Seed script for Pluribus database
 * Creates test users including an ADMIN user
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create ADMIN user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pluribus.com' },
    update: {},
    create: {
      email: 'admin@pluribus.com',
      password: hashedPassword,
      name: 'Platform Administrator',
      role: 'ADMIN',
      country: 'USA',
      city: 'San Francisco',
      bio: 'Platform administrator with full access to admin panel',
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('✅ Created ADMIN user:', admin.email);

  // Update existing seller users (optional - keep them as SELLER)
  const seller = await prisma.user.findUnique({
    where: { email: 'seller@test.com' },
  });

  if (seller) {
    console.log('✅ Existing SELLER user found:', seller.email);
  }

  const both = await prisma.user.findUnique({
    where: { email: 'both@test.com' },
  });

  if (both) {
    console.log('✅ Existing SELLER user found:', both.email);
  }

  console.log('');
  console.log('🎉 Seeding complete!');
  console.log('');
  console.log('📝 Admin credentials:');
  console.log('   Email:    admin@pluribus.com');
  console.log('   Password: password123');
  console.log('   Role:     ADMIN');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
