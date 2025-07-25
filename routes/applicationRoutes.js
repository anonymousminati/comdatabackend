const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer');
const applicationController = require('../controllers/applicationController');
const { createFormRateLimit } = require('../middleware/rateLimiter');

// Apply rate limiting to application routes
const formRateLimit = createFormRateLimit();

/**
 * POST /api/applications/submit
 * Submit a job application with resume upload
 */
router.post('/submit', 
  formRateLimit,
  upload.single('resume'), 
  applicationController.submitApplication
);

module.exports = router;
