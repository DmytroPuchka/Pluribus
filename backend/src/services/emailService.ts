import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@example.com';
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || 'Pluribus';

// Gmail SMTP configuration
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

// Create transporter
let transporter: nodemailer.Transporter | null = null;

if (GMAIL_USER && GMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
} else {
  console.warn('⚠️  Gmail credentials not configured. Emails will only be logged to console.');
}

/**
 * Load email template
 */
function loadEmailTemplate(templateName: string): string {
  const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.html`);

  try {
    return fs.readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error(`Failed to load email template: ${templateName}`, error);
    return '<html><body>{{content}}</body></html>';
  }
}

/**
 * Replace placeholders in email template
 */
function replaceTemplatePlaceholders(template: string, replacements: Record<string, string>): string {
  let result = template;

  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  }

  return result;
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationToken: string
): Promise<void> {
  const verificationLink = `${FRONTEND_URL}/verify-email?token=${verificationToken}`;

  let htmlTemplate = loadEmailTemplate('verificationEmail');

  htmlTemplate = replaceTemplatePlaceholders(htmlTemplate, {
    name,
    verificationLink,
    frontendUrl: FRONTEND_URL,
  });

  const mailOptions = {
    from: `"${EMAIL_FROM_NAME}" <${GMAIL_USER || EMAIL_FROM}>`,
    to: email,
    subject: 'Verify your email address - Pluribus',
    html: htmlTemplate,
    text: `Hi ${name},\n\nThanks for signing up for Pluribus! Please verify your email address by clicking the link below:\n\n${verificationLink}\n\nThis link will expire in 24 hours.\n\nIf you didn't create an account, you can ignore this email.\n\nBest regards,\nPluribus Team`,
  };

  try {
    if (!transporter) {
      console.log('⚠️  Email transporter not configured. Email would be sent to:', email);
      console.log('📧 Verification link:', verificationLink);
      console.log('---');
      console.log('To enable email sending:');
      console.log('1. Set GMAIL_USER in .env');
      console.log('2. Set GMAIL_APP_PASSWORD in .env (get it from Google Account settings)');
      console.log('---');
      return;
    }

    await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent to:', email);
  } catch (error: any) {
    console.error('❌ Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

/**
 * Send welcome email (after verification)
 */
export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  let htmlTemplate = loadEmailTemplate('welcomeEmail');

  htmlTemplate = replaceTemplatePlaceholders(htmlTemplate, {
    name,
    frontendUrl: FRONTEND_URL,
    dashboardLink: `${FRONTEND_URL}/dashboard`,
  });

  const mailOptions = {
    from: `"${EMAIL_FROM_NAME}" <${GMAIL_USER || EMAIL_FROM}>`,
    to: email,
    subject: 'Welcome to Pluribus! 🎉',
    html: htmlTemplate,
    text: `Hi ${name},\n\nWelcome to Pluribus! Your email has been verified successfully.\n\nYou can now start exploring our platform and connect with buyers and sellers from around the world.\n\nVisit your dashboard: ${FRONTEND_URL}/dashboard\n\nBest regards,\nPluribus Team`,
  };

  try {
    if (!transporter) {
      console.log('⚠️  Email transporter not configured. Welcome email would be sent to:', email);
      return;
    }

    await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', email);
  } catch (error: any) {
    console.error('❌ Failed to send welcome email:', error);
    // Don't throw error for welcome email - it's not critical
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetToken: string
): Promise<void> {
  const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;

  let htmlTemplate = loadEmailTemplate('passwordResetEmail');

  htmlTemplate = replaceTemplatePlaceholders(htmlTemplate, {
    name,
    resetLink,
    frontendUrl: FRONTEND_URL,
  });

  const mailOptions = {
    from: `"${EMAIL_FROM_NAME}" <${GMAIL_USER || EMAIL_FROM}>`,
    to: email,
    subject: 'Reset your password - Pluribus',
    html: htmlTemplate,
    text: `Hi ${name},\n\nWe received a request to reset your password. Click the link below to reset it:\n\n${resetLink}\n\nThis link will expire in 1 hour.\n\nIf you didn't request a password reset, you can ignore this email.\n\nBest regards,\nPluribus Team`,
  };

  try {
    if (!transporter) {
      console.log('⚠️  Email transporter not configured. Password reset email would be sent to:', email);
      console.log('📧 Reset link:', resetLink);
      return;
    }

    await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent to:', email);
  } catch (error: any) {
    console.error('❌ Failed to send password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}
