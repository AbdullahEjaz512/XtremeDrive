import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

async function createPrismaClient() {
  const { PrismaClient } = await import('@prisma/client');
  const { PrismaBetterSqlite3 } = await import('@prisma/adapter-better-sqlite3');

  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL || 'file:./dev.db'
  });

  const prisma = new PrismaClient({ adapter, log: ['error'] });
  await prisma.$connect();
  return prisma;
}

async function seedData(prismaClient) {
  if (!prismaClient || !prismaClient.user) {
    return;
  }

  const userCount = await prismaClient.user.count();
  if (userCount > 0) {
    return;
  }

  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.default.hash('password123', 10);

  const user = await prismaClient.user.create({
    data: {
      email: 'seller@example.com',
      password: hashedPassword,
      name: 'Test Seller',
      phone: '0300-1234567',
      city: 'Lahore'
    }
  });

  const ads = [
    {
      userId: user.id,
      category: 'CAR',
      title: 'Toyota Corolla Altis Grande 1.8 2022',
      make: 'Toyota',
      model: 'Corolla',
      year: 2022,
      city: 'Lahore',
      price: 5200000,
      mileage: 15000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engineCapacity: 1800,
      condition: 'Used',
      description: 'First owner, bumper to bumper original. Maintained by Toyota Authorized Dealership.',
      images: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop,https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop',
      features: 'ABS, Airbags, Sunroof, Alloy Rims, Cruise Control'
    },
    {
      userId: user.id,
      category: 'CAR',
      title: 'Honda Civic Oriel 1.5 Turbo 2021',
      make: 'Honda',
      model: 'Civic',
      year: 2021,
      city: 'Karachi',
      price: 5800000,
      mileage: 28000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engineCapacity: 1500,
      condition: 'Used',
      description: 'Excellent condition. Single hand used. Fully loaded features.',
      images: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop,https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop',
      features: 'ABS, Airbags, Sunroof, Alloy Rims, Navigation'
    },
    {
      userId: user.id,
      category: 'BIKE',
      title: 'Yamaha YBR 125G 2023',
      make: 'Yamaha',
      model: 'YBR 125G',
      year: 2023,
      city: 'Islamabad',
      price: 450000,
      mileage: 5000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      engineCapacity: 125,
      condition: 'Used',
      description: 'Sparingly used Yamaha YBR 125G. Scratchless condition, like new.',
      images: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop',
      features: 'Self Start, Front Disk Brake, Alloy Wheels'
    },
    {
      userId: user.id,
      category: 'AUTOPART',
      title: 'Suzuki Alto Android Panel 9 inch',
      make: 'Suzuki',
      model: 'Alto',
      year: null,
      city: 'Rawalpindi',
      price: 12500,
      mileage: null,
      fuelType: null,
      transmission: null,
      engineCapacity: null,
      condition: 'New',
      description: 'IPS Display, 2GB RAM / 32GB ROM, Android 12, Google Maps, Youtube supported.',
      images: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&auto=format&fit=crop',
      features: 'GPS, Bluetooth, Wi-Fi'
    },
    {
      userId: user.id,
      category: 'CAR',
      title: 'Suzuki Alto VXR 2020',
      make: 'Suzuki',
      model: 'Alto',
      year: 2020,
      city: 'Faisalabad',
      price: 2450000,
      mileage: 45000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      engineCapacity: 660,
      condition: 'Used',
      description: 'Home used car. Great fuel average (20+ km/L). Neat interior.',
      images: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop',
      features: 'Air Conditioning, Power Steering'
    }
  ];

  for (const ad of ads) {
    await prismaClient.ad.create({ data: ad });
  }
}

export async function createApp({ seed = true } = {}) {
  const app = express();

  app.use(helmet());
  app.use(morgan('combined'));
  app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
  app.use(express.json());

  const prisma = await createPrismaClient();
  app.locals.prisma = prisma;

  const { default: authRoutes } = await import('./routes/auth.js');
  const { default: adsRoutes } = await import('./routes/ads.js');
  const { errorHandler } = await import('./middleware/auth.js');

  if (seed) {
    try {
      await seedData(prisma);
    } catch (error) {
      console.error('Seed error:', error);
    }
  }

  app.use('/api/auth', authRoutes);
  app.use('/api/ads', adsRoutes);

  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  app.use(errorHandler);

  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  return { app, prisma };
}
