const rateLimit = require('express-rate-limit');

/**
 * Rate limiting middleware for form submissions
 */
const createFormRateLimit = () => {
  return rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // limit each IP to 5 requests per windowMs
    message: {
      success: false,
      message: 'Too many form submissions, please try again later.',
      retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
};

/**
 * General API rate limiting
 */
const createApiRateLimit = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      success: false,
      message: 'Too many API requests, please try again later.'
    }
  });
};

module.exports = {
  createFormRateLimit,
  createApiRateLimit
};
