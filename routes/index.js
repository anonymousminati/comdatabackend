const express = require('express');
const router = express.Router();

// Import route modules
const applicationRoutes = require('./applicationRoutes');
const contactRoutes = require('./contactRoutes');
const testRoutes = require('./testRoutes');

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ComData API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API info endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to ComData Innovation API',
    version: '1.0.0',
    endpoints: {
      applications: '/api/applications',
      contact: '/api/contact',
      test: '/api/test',
      health: '/api/health'
    },
    documentation: 'https://api.comdatainnovation.com/docs'
  });
});

// Mount route modules
router.use('/applications', applicationRoutes);
router.use('/contact', contactRoutes);
router.use('/test', testRoutes);

module.exports = router;
