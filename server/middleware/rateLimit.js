import rateLimit from 'express-rate-limit';

// Login rate limiter: 5 attempts per 15 minutes per IP
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => {
    // Use IP address as key
    return req.ip || req.connection.remoteAddress;
  },
  skip: (req, res) => false, // Don't skip any requests
  onLimitReached: (req, res, options) => {
    console.warn(`Rate limit reached for IP: ${req.ip}`);
  },
});

// General API rate limiter: 100 requests per 15 minutes per IP
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after some time',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    return req.ip || req.connection.remoteAddress;
  },
});

// Create ad rate limiter: 10 requests per hour per user
export const createAdLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each authenticated user to 10 ad creations per hour
  message: 'Too many ads created, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    // For authenticated users, use userId; for others use IP
    return req.userId || req.ip || req.connection.remoteAddress;
  },
  skip: (req, res) => !req.userId, // Only apply to authenticated users
});
