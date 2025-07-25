const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { createFormRateLimit } = require('../middleware/rateLimiter');

// Apply rate limiting to contact routes
const formRateLimit = createFormRateLimit();

/**
 * POST /api/contact/submit
 * Submit contact form
 */
router.post('/submit', 
  formRateLimit,
  contactController.submitContact
);

module.exports = router;
