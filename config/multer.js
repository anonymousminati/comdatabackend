const multer = require('multer');

/**
 * Multer configuration for file uploads
 */
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter: fileFilter
});

module.exports = {
  upload
};
