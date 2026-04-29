import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Seed data if DB is empty
async function seedData() {
  const count = await prisma.ad.count();
  if (count === 0) {
    console.log('Seeding initial data...');
    const ads = [
      {
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
        features: 'ABS, Airbags, Sunroof, Alloy Rims, Cruise Control',
        sellerName: 'Ali Khan',
        sellerPhone: '0300-1234567',
        sellerEmail: 'ali@example.com'
      },
      {
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
        features: 'ABS, Airbags, Sunroof, Alloy Rims, Navigation',
        sellerName: 'Usman Ahmed',
        sellerPhone: '0321-9876543',
        sellerEmail: 'usman@example.com'
      },
      {
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
        features: 'Self Start, Front Disk Brake, Alloy Wheels',
        sellerName: 'Hamza Malik',
        sellerPhone: '0333-5554433',
        sellerEmail: 'hamza@example.com'
      },
      {
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
        features: 'GPS, Bluetooth, Wi-Fi',
        sellerName: 'Auto Hub Rawalpindi',
        sellerPhone: '0315-7776655',
        sellerEmail: 'autohub@example.com'
      },
      {
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
        features: 'Air Conditioning, Power Steering',
        sellerName: 'Faisal Mehmood',
        sellerPhone: '0304-4443322',
        sellerEmail: 'faisal@example.com'
      }
    ];

    for (const ad of ads) {
      await prisma.ad.create({ data: ad });
    }
    console.log('Seed data inserted.');
  }
}

seedData().catch(e => console.error('Seed error:', e));

// API Routes

// Get all ads with filters
app.get('/api/ads', async (req, res) => {
  try {
    const { category, make, city, minPrice, maxPrice, condition, search } = req.query;
    
    let where = {};
    
    if (category) where.category = category;
    if (make) where.make = make;
    if (city) where.city = city;
    if (condition) where.condition = condition;
    
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { make: { contains: search } },
        { model: { contains: search } }
      ];
    }

    const ads = await prisma.ad.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get distinct makes
app.get('/api/makes', async (req, res) => {
  try {
    const makes = await prisma.ad.findMany({
      select: { make: true },
      distinct: ['make']
    });
    res.json(makes.map(m => m.make));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get distinct cities
app.get('/api/cities', async (req, res) => {
  try {
    const cities = await prisma.ad.findMany({
      select: { city: true },
      distinct: ['city']
    });
    res.json(cities.map(c => c.city));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single ad
app.get('/api/ads/:id', async (req, res) => {
  try {
    const ad = await prisma.ad.findUnique({
      where: { id: req.params.id }
    });
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create ad
app.post('/api/ads', async (req, res) => {
  try {
    const {
      category, title, make, model, year, city, price, mileage,
      fuelType, transmission, engineCapacity, condition, description,
      images, features, sellerName, sellerPhone, sellerEmail
    } = req.body;
    
    if (!category || !title || !make || !model || !city || !price || !condition || !sellerName || !sellerPhone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const ad = await prisma.ad.create({
      data: {
        category,
        title,
        make,
        model,
        year: year ? parseInt(year) : null,
        city,
        price: parseFloat(price),
        mileage: mileage ? parseInt(mileage) : null,
        fuelType,
        transmission,
        engineCapacity: engineCapacity ? parseInt(engineCapacity) : null,
        condition,
        description,
        images: images || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop',
        features,
        sellerName,
        sellerPhone,
        sellerEmail
      }
    });

    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
