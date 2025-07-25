const { createEmailTransporter } = require('../config/email');

/**
 * Test Controller
 * For testing email functionality
 */
class TestController {
  constructor() {
    this.transporter = createEmailTransporter();
  }

  /**
   * Test email functionality
   * @param {Request} req 
   * @param {Response} res 
   */
  async testEmail(req, res) {
    try {
      const { to = 'test@example.com' } = req.body;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'ComData API - Email Test',
        html: `
          <h2>Email Test Successful!</h2>
          <p>This is a test email from ComData Innovation Backend API.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Server:</strong> ${process.env.NODE_ENV || 'development'}</p>
        `
      };

      await this.transporter.sendMail(mailOptions);

      res.status(200).json({
        success: true,
        message: 'Test email sent successfully!',
        data: {
          to: to,
          from: process.env.EMAIL_USER,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('❌ Error sending test email:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to send test email',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Get email configuration status
   * @param {Request} req 
   * @param {Response} res 
   */
  getEmailStatus(req, res) {
    const emailConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
    
    res.status(200).json({
      success: true,
      emailConfigured: emailConfigured,
      configuration: {
        host: process.env.EMAIL_HOST || 'Not configured',
        port: process.env.EMAIL_PORT || 'Not configured',
        user: process.env.EMAIL_USER ? '✅ Configured' : '❌ Not configured',
        secure: process.env.EMAIL_SECURE === 'true'
      }
    });
  }
}

module.exports = new TestController();
