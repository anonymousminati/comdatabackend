# ComData Innovation Backend API

Backend API server for the ComData Innovation website, handling form submissions and email services.

## 🚀 Features

- **Job Application Submissions** - Handle resume uploads and application forms
- **Contact Form Processing** - Process contact inquiries
- **Email Integration** - Automated email notifications using Nodemailer
- **File Upload Handling** - Secure file upload with validation
- **Rate Limiting** - Protection against spam and abuse
- **Error Handling** - Comprehensive error handling and logging
- **CORS Support** - Cross-origin resource sharing configuration
- **Security** - Helmet.js security headers

## 📁 Project Structure

```
backend/
├── config/
│   ├── email.js          # Email transporter configuration
│   └── multer.js          # File upload configuration
├── controllers/
│   ├── applicationController.js  # Job application logic
│   └── contactController.js      # Contact form logic
├── middleware/
│   ├── errorHandler.js    # Error handling middleware
│   └── rateLimiter.js     # Rate limiting middleware
├── models/
│   ├── Application.js     # Application data model
│   └── Contact.js         # Contact data model
├── routes/
│   ├── applicationRoutes.js  # Application routes
│   ├── contactRoutes.js      # Contact routes
│   └── index.js              # Main router
├── .env.example           # Environment variables example
├── .gitignore            # Git ignore rules
├── index.js              # Main application file
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your actual values:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:3001
   ```

3. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📧 Email Configuration

### Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASS`

### Corporate Email Setup

For production, configure your corporate email settings:
```env
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=your-email-password
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```http
GET /api/health
```

### Job Applications
```http
POST /api/applications/submit
Content-Type: multipart/form-data

Body:
- firstName (string, required)
- lastName (string, required)
- email (string, required)
- message (string, required, min 50 chars)
- resume (file, required, PDF/DOC/DOCX, max 5MB)
```

### Contact Form
```http
POST /api/contact/submit
Content-Type: application/json

Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "message": "Your message here (min 10 chars)"
}
```

## 🔒 Security Features

- **Rate Limiting**: 5 form submissions per 15 minutes per IP
- **File Validation**: Only PDF, DOC, DOCX files allowed
- **File Size Limit**: Maximum 5MB file uploads
- **CORS Protection**: Configured for specific frontend origin
- **Security Headers**: Helmet.js for security headers
- **Input Validation**: Server-side validation for all inputs

## 🚦 Rate Limits

- **Form Submissions**: 5 requests per 15 minutes per IP
- **General API**: 100 requests per 15 minutes per IP

## 📝 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5000 | No |
| `NODE_ENV` | Environment | development | No |
| `EMAIL_HOST` | SMTP host | - | Yes |
| `EMAIL_PORT` | SMTP port | 587 | Yes |
| `EMAIL_SECURE` | Use SSL/TLS | false | No |
| `EMAIL_USER` | Email username | - | Yes |
| `EMAIL_PASS` | Email password | - | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3001 | No |
| `MAX_FILE_SIZE` | Max upload size in bytes | 5242880 | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 5 | No |

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["validation error 1", "validation error 2"],
  "error": "SPECIFIC_ERROR_CODE"
}
```

## 📊 Monitoring

### Health Check
Monitor server health:
```bash
curl http://localhost:5000/api/health
```

### Logs
The server logs important events:
- ✅ Successful submissions
- ❌ Errors and failures
- 🔒 Rate limit violations
- 📧 Email sending status

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### PM2 (Production Process Manager)
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start index.js --name "comdata-api"

# Monitor
pm2 monit

# Restart
pm2 restart comdata-api
```

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Update documentation
5. Test all endpoints

## 📞 Support

For support, email: support@comdatainnovation.com

---

**ComData Innovation Pvt. Ltd.** - Empowering the Future of Digital Transformation
