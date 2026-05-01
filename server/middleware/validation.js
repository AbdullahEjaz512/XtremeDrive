export const validateSignup = (req, res, next) => {
  const { email, password, name, phone, city } = req.body;
  
  const errors = [];

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.push('Valid email is required');
  } else if (email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  } else if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required');
  } else if (name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (phone && typeof phone !== 'string') {
    errors.push('Phone must be a string');
  } else if (phone && phone.length > 20) {
    errors.push('Phone must be less than 20 characters');
  }

  if (city && typeof city !== 'string') {
    errors.push('City must be a string');
  } else if (city && city.length > 50) {
    errors.push('City must be less than 50 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  const errors = [];

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.push('Valid email is required');
  } else if (email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
  } else if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateAd = (req, res, next) => {
  const { title, make, model, city, price, condition, description } = req.body;
  
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length > 150) {
    errors.push('Title must be less than 150 characters');
  }

  if (!make || typeof make !== 'string' || make.trim().length === 0) {
    errors.push('Make is required');
  } else if (make.length > 50) {
    errors.push('Make must be less than 50 characters');
  }

  if (!model || typeof model !== 'string' || model.trim().length === 0) {
    errors.push('Model is required');
  } else if (model.length > 50) {
    errors.push('Model must be less than 50 characters');
  }

  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    errors.push('City is required');
  } else if (city.length > 50) {
    errors.push('City must be less than 50 characters');
  }

  if (!price || isNaN(parseFloat(price)) || parseFloat(price) < 0) {
    errors.push('Valid price is required');
  }

  if (!condition || typeof condition !== 'string') {
    errors.push('Condition is required');
  } else if (condition.length > 50) {
    errors.push('Condition must be less than 50 characters');
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Description is required');
  } else if (description.length > 5000) {
    errors.push('Description must be less than 5000 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validatePagination = (req, res, next) => {
  const { page = '1', limit = '10' } = req.query;
  
  const errors = [];
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  if (isNaN(pageNum) || pageNum < 1) {
    errors.push('Page must be a positive number');
  }

  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    errors.push('Limit must be between 1 and 100');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Pass validated values to next middleware
  req.pagination = { page: pageNum, limit: limitNum };
  next();
};
