const Application = require('../models/Application');
const { createEmailTransporter } = require('../config/email');

/**
 * Application Controller
 * Handles job application submissions
 */
class ApplicationController {
  constructor() {
    this.transporter = createEmailTransporter();
    // Bind methods to preserve context
    this.submitApplication = this.submitApplication.bind(this);
  }

  /**
   * Submit job application
   * @param {Request} req 
   * @param {Response} res 
   */
  async submitApplication(req, res) {
    try {
      // Create application instance
      const applicationData = {
        ...req.body,
        resumeFile: req.file
      };

      const application = new Application(applicationData);

      // Validate application
      const validation = application.validate();
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        });
      }

      // Send email
      await this.sendApplicationEmail(application);

      // Log successful submission
      console.log(`✅ Application submitted successfully by ${application.getFullName()}`);

      res.status(200).json({
        success: true,
        message: 'Application submitted successfully!',
        data: {
          name: application.getFullName(),
          email: application.email,
          submittedAt: application.submittedAt
        }
      });

    } catch (error) {
      console.error('❌ Error in submitApplication:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to submit application. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Send application email with resume attachment
   * @param {Application} application 
   */
  async sendApplicationEmail(application) {
    const emailData = application.toEmailData();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Career Application from ${emailData.fullName}`,
      html: this.generateApplicationEmailTemplate(emailData),
      attachments: [
        {
          filename: application.resumeFile.originalname,
          content: application.resumeFile.buffer,
          contentType: application.resumeFile.mimetype,
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }

  /**
   * Generate HTML email template for application
   * @param {Object} data 
   * @returns {string}
   */
  generateApplicationEmailTemplate(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #00A4EF; margin: 0;">New Career Application</h2>
          <p style="color: #666; margin: 5px 0;">ComData Innovation Pvt. Ltd.</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Applicant Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 130px;">Name:</td>
              <td style="padding: 8px 0;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #00A4EF;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Submitted:</td>
              <td style="padding: 8px 0;">${data.submittedAt}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Resume:</td>
              <td style="padding: 8px 0;">${data.resumeFileName}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; margin-bottom: 10px;">Why should we hire them?</h3>
          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #00A4EF; border-radius: 4px;">
            <p style="margin: 0; line-height: 1.6; color: #555;">${data.message}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 12px; margin: 0;">
            This email was sent from the ComData Innovation career application form.
          </p>
        </div>
      </div>
    `;
  }
}

module.exports = new ApplicationController();
