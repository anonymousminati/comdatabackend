/**
 * Application Model
 * Represents a job application with validation
 */
class Application {
  constructor(data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.message = data.message;
    this.resumeFile = data.resumeFile;
    this.submittedAt = new Date();
  }

  /**
   * Validate application data
   * @returns {Object} validation result with isValid boolean and errors array
   */
  validate() {
    const errors = [];

    if (!this.firstName || this.firstName.trim().length === 0) {
      errors.push('First name is required');
    }

    if (!this.lastName || this.lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    if (!this.email || this.email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(this.email)) {
      errors.push('Please provide a valid email address');
    }

    if (!this.message || this.message.trim().length < 50) {
      errors.push('Message must be at least 50 characters long');
    }

    if (!this.resumeFile) {
      errors.push('Resume file is required');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Check if email format is valid
   * @param {string} email 
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Get full name
   * @returns {string}
   */
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Convert to plain object for email template
   * @returns {Object}
   */
  toEmailData() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.getFullName(),
      email: this.email,
      message: this.message,
      submittedAt: this.submittedAt.toLocaleString(),
      resumeFileName: this.resumeFile?.originalname
    };
  }
}

module.exports = Application;
