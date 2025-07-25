const nodemailer = require('nodemailer');

/**
 * Email transporter configuration using environment variables
 */
const createEmailTransporter = () => {
  // Check if required environment variables are set
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration incomplete. Please check EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in .env file');
  }

  const config = {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

    tls: {
      rejectUnauthorized: false
    }
  };

  // Debug log the configuration (without password)
  console.log('📧 Email config:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: config.auth.user
  });

  const transporter = nodemailer.createTransport(config);

  // Verify transporter connection
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Nodemailer transporter verification failed:', error);
    } else {
      console.log('✅ Nodemailer transporter is ready to send emails!');
    }
  });

  return transporter;
};

module.exports = {
  createEmailTransporter
};
