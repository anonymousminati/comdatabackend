const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

/**
 * POST /api/test/email
 * Send a test email
 */
router.post('/email', testController.testEmail);

/**
 * GET /api/test/email-status
 * Get email configuration status
 */
router.get('/email-status', testController.getEmailStatus);

module.exports = router;
