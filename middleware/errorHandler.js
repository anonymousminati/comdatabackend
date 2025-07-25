const multer = require('multer');

/**
 * Error handling middleware
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error occurred:', err);

  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.',
        error: 'FILE_TOO_LARGE'
      });
    }
    
    return res.status(400).json({
      success: false,
      message: 'File upload error.',
      error: err.code
    });
  }

  // Custom file type error
  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: 'INVALID_FILE_TYPE'
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

/**
 * 404 Not Found handler
 * @param {Request} req 
 * @param {Response} res 
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.originalUrl
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
