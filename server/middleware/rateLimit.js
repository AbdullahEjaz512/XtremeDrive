import rateLimit from 'express-rate-limit';

// Login rate limiter: 5 attempts per 15 minutes per IP
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// General API rate limiter: 100 requests per 15 minutes per IP
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after some time',
  standardHeaders: true,
  legacyHeaders: false,
});

// Create ad rate limiter: 10 requests per hour per user
export const createAdLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each authenticated user to 10 ad creations per hour
  message: 'Too many ads created, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});
