require('dotenv').config();
const { createEmailTransporter } = require('./config/email');

console.log('🧪 Testing nodemailer configuration...');
console.log('📧 Email settings:');
console.log(`   Host: ${process.env.EMAIL_HOST}`);
console.log(`   Port: ${process.env.EMAIL_PORT}`);
console.log(`   Secure: ${process.env.EMAIL_SECURE}`);
console.log(`   User: ${process.env.EMAIL_USER}`);
console.log(`   Pass: ${process.env.EMAIL_PASS ? '***configured***' : 'NOT SET'}`);
console.log('');

try {
  const transporter = createEmailTransporter();
  console.log('✅ Email transporter created successfully!');
  console.log('📧 Nodemailer is working correctly.');
} catch (error) {
  console.error('❌ Error creating email transporter:', error.message);
}
