import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { validateAd, validatePagination } from '../middleware/validation.js';

const router = express.Router();

// Helper to get prisma from app
function getPrisma(req) {
  return req.app.locals.prisma;
}

// Get all ads with pagination and filtering
router.get('/', validatePagination, async (req, res, next) => {
  try {
    const prisma = getPrisma(req);
    const { page, limit } = req.pagination; // Use validated pagination
    const { category, city, sortBy = 'createdAt' } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (category) where.category = category;
    if (city) where.city = { contains: city };

    const ads = await prisma.ad.findMany({
      where,
      skip: skip,
      take: limit,
      orderBy: { [sortBy]: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, phone: true, city: true, profileImage: true }
        }
      }
    });

    const total = await prisma.ad.count({ where });

    res.status(200).json({
      ads,
      pagination: {
        page: page,
        limit: limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single ad
router.get('/:id', async (req, res, next) => {
  try {
    const prisma = getPrisma(req);
    const ad = await prisma.ad.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: { id: true, name: true, phone: true, email: true, city: true, profileImage: true, bio: true }
        }
      }
    });

    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    res.status(200).json({ ad });
  } catch (error) {
    next(error);
  }
});

// Create ad (requires authentication)
router.post('/', verifyToken, validateAd, async (req, res, next) => {
  try {
    const prisma = getPrisma(req);
    const { category, title, make, model, year, city, price, mileage, fuelType, transmission, engineCapacity, condition, description, images, features } = req.body;

    if (!title || !make || !model || !city || !price || !condition || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ad = await prisma.ad.create({
      data: {
        userId: req.userId,
        category: category || 'CAR',
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
        images: images || '',
        features: features || ''
      },
      include: {
        user: {
          select: { id: true, name: true, phone: true, city: true, profileImage: true }
        }
      }
    });

    res.status(201).json({ message: 'Ad created successfully', ad });
  } catch (error) {
    next(error);
  }
});

// Update ad (requires authentication)
router.put('/:id', verifyToken, async (req, res, next) => {
  try {
    const prisma = getPrisma(req);
    // Check if ad exists and user is owner
    const ad = await prisma.ad.findUnique({ where: { id: req.params.id } });
    
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    if (ad.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only edit your own ads' });
    }

    const { title, price, description, images, features, condition, mileage } = req.body;

    const updatedAd = await prisma.ad.update({
      where: { id: req.params.id },
      data: {
        ...(title && { title }),
        ...(price && { price: parseFloat(price) }),
        ...(description && { description }),
        ...(images && { images }),
        ...(features && { features }),
        ...(condition && { condition }),
        ...(mileage && { mileage: parseInt(mileage) })
      },
      include: {
        user: {
          select: { id: true, name: true, phone: true, city: true, profileImage: true }
        }
      }
    });

    res.status(200).json({ message: 'Ad updated successfully', ad: updatedAd });
  } catch (error) {
    next(error);
  }
});

// Delete ad (requires authentication)
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const prisma = getPrisma(req);
    // Check if ad exists and user is owner
    const ad = await prisma.ad.findUnique({ where: { id: req.params.id } });
    
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    if (ad.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own ads' });
    }

    await prisma.ad.delete({ where: { id: req.params.id } });

    res.status(200).json({ message: 'Ad deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Get user's ads (requires authentication)
router.get('/user/my-ads', verifyToken, async (req, res, next) => {
  try {
    const prisma = getPrisma(req);
    const ads = await prisma.ad.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, phone: true, city: true, profileImage: true }
        }
      }
    });

    res.status(200).json({ ads });
  } catch (error) {
    next(error);
  }
});

export default router;
