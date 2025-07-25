const Contact = require('../models/Contact');
const { createEmailTransporter } = require('../config/email');

/**
 * Contact Controller
 * Handles contact form submissions
 */
class ContactController {
  constructor() {
    this.transporter = createEmailTransporter();
    // Bind methods to preserve context
    this.submitContact = this.submitContact.bind(this);
  }

  /**
   * Submit contact form
   * @param {Request} req 
   * @param {Response} res 
   */
  async submitContact(req, res) {
    try {
      // Create contact instance
      const contact = new Contact(req.body);

      // Validate contact form
      const validation = contact.validate();
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        });
      }

      // Send email
      await this.sendContactEmail(contact);

      // Log successful submission
      console.log(`✅ Contact form submitted successfully by ${contact.getFullName()}`);

      res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully!',
        data: {
          name: contact.getFullName(),
          email: contact.email,
          submittedAt: contact.submittedAt
        }
      });

    } catch (error) {
      console.error('❌ Error in submitContact:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  /**
   * Send contact email
   * @param {Contact} contact 
   */
  async sendContactEmail(contact) {
    const emailData = contact.toEmailData();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${emailData.fullName}`,
      html: this.generateContactEmailTemplate(emailData),
      replyTo: emailData.email
    };

    await this.transporter.sendMail(mailOptions);
  }

  /**
   * Generate HTML email template for contact form
   * @param {Object} data 
   * @returns {string}
   */
  generateContactEmailTemplate(data) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #00A4EF; margin: 0;">New Contact Form Submission</h2>
          <p style="color: #666; margin: 5px 0;">ComData Innovation Pvt. Ltd.</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
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
          </table>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; margin-bottom: 10px;">Message</h3>
          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #00A4EF; border-radius: 4px;">
            <p style="margin: 0; line-height: 1.6; color: #555;">${data.message}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 12px; margin: 0;">
            This email was sent from the ComData Innovation contact form.
          </p>
        </div>
      </div>
    `;
  }
}

module.exports = new ContactController();
