import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Must be false for 587
  pool: true,    // Helps with timeouts
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2"
  },
  connectionTimeout: 20000,
});

export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: `"CodeVirus Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Your Verification Code for CodeVirus",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1e293b;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #2563eb, #1e40af);
            padding: 32px 24px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            color: white;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.5px;
          }
          .content {
            padding: 40px 32px;
            background: white;
          }
          .otp-box {
            background: #eff6ff;
            border: 2px solid #2563eb;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
          }
          .otp-code {
            font-size: 48px;
            font-weight: 700;
            letter-spacing: 8px;
            color: #2563eb;
            font-family: 'Courier New', monospace;
          }
          .otp-expiry {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 16px;
            margin: 24px 0;
            border-radius: 8px;
            color: #92400e;
          }
          .footer {
            background: #f1f5f9;
            padding: 24px 32px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
            border-top: 1px solid #e2e8f0;
          }
          .button {
            display: inline-block;
            background: #2563eb;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            margin: 16px 0;
          }
          .security-note {
            background: #f8fafc;
            padding: 16px;
            border-radius: 8px;
            margin: 24px 0;
            font-size: 14px;
            color: #475569;
          }
          hr {
            border: none;
            border-top: 1px solid #e2e8f0;
            margin: 24px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 CodeVirus</h1>
          </div>
          
          <div class="content">
            <h2 style="margin-top: 0; color: #0f172a;">Verify Your Email Address</h2>
            
            <p style="font-size: 16px; color: #334155;">
              Hello,
            </p>
            
            <p style="font-size: 16px; color: #334155; margin-bottom: 24px;">
              Thank you for choosing CodeVirus. To complete your registration, please use the following verification code:
            </p>
            
            <div class="otp-box">
              <div style="color: #64748b; margin-bottom: 8px; font-size: 14px;">Verification Code</div>
              <div class="otp-code">${otp}</div>
            </div>
            
            <div class="otp-expiry">
              <strong>⏰ Expires in 5 minutes</strong>
              <p style="margin: 8px 0 0 0; font-size: 14px;">
                This code will expire on ${new Date(Date.now() + 5 * 60000).toLocaleString()}
              </p>
            </div>
            
            <div class="security-note">
              <strong>🔒 Security Tip:</strong> Never share this code with anyone. Our team will never ask for your verification code.
            </div>
            
            <hr />
            
            <p style="font-size: 14px; color: #64748b;">
              If you didn't request this code, you can safely ignore this email. Your account security is important to us.
            </p>
            
            <p style="font-size: 14px; color: #64748b; margin-top: 24px;">
              Best regards,<br />
              <strong style="color: #2563eb;">The CodeVirus Security Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 8px 0;">
              © ${new Date().getFullYear()} CodeVirus. All rights reserved.
            </p>
            <p style="margin: 0; font-size: 12px;">
              This is an automated message, please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      🔐 CodeVirus - Email Verification
      
      Your verification code is: ${otp}
      
      This code will expire in 5 minutes.
      
      Security Tip: Never share this code with anyone.
      
      If you didn't request this code, please ignore this email.
      
      Best regards,
      The CodeVirus Security Team
    `
  };

  return transporter.sendMail(mailOptions);
};

// Welcome email after successful registration
export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: `"CodeVirus Security" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to CodeVirus Security Community!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1e293b;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #2563eb, #1e40af);
            padding: 32px 24px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            color: white;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.5px;
          }
          .content {
            padding: 40px 32px;
            background: white;
          }
          .welcome-box {
            background: linear-gradient(135deg, #f0f9ff, #e6f7e6);
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
          }
          .feature-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin: 32px 0;
          }
          .feature-item {
            background: #f8fafc;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
          }
          .footer {
            background: #f1f5f9;
            padding: 24px 32px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
            border-top: 1px solid #e2e8f0;
          }
          .button {
            display: inline-block;
            background: #2563eb;
            color: white;
            padding: 12px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            margin: 16px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to CodeVirus!</h1>
          </div>
          
          <div class="content">
            <div class="welcome-box">
              <h2 style="margin: 0; color: #0f172a;">Hello, ${name || 'Security Enthusiast'}! 👋</h2>
              <p style="color: #2563eb; margin: 8px 0 0 0; font-weight: 500;">
                Your account has been successfully verified
              </p>
            </div>
            
            <p style="font-size: 16px; color: #334155;">
              Welcome to the CodeVirus security community! You're now part of a growing network of security professionals and enthusiasts.
            </p>
            
            <h3 style="color: #0f172a; margin-top: 32px;">✨ What you can do now:</h3>
            
            <div class="feature-grid">
              <div class="feature-item">
                <div style="font-size: 24px; margin-bottom: 8px;">📝</div>
                <strong>Ask Questions</strong>
                <p style="font-size: 13px; color: #64748b; margin: 8px 0 0 0;">
                  Get answers from security experts
                </p>
              </div>
              <div class="feature-item">
                <div style="font-size: 24px; margin-bottom: 8px;">💡</div>
                <strong>Share Knowledge</strong>
                <p style="font-size: 13px; color: #64748b; margin: 8px 0 0 0;">
                  Help others with your expertise
                </p>
              </div>
              <div class="feature-item">
                <div style="font-size: 24px; margin-bottom: 8px;">🔒</div>
                <strong>Security Topics</strong>
                <p style="font-size: 13px; color: #64748b; margin: 8px 0 0 0;">
                  Explore rootkits, zero-days & more
                </p>
              </div>
              <div class="feature-item">
                <div style="font-size: 24px; margin-bottom: 8px;">🌐</div>
                <strong>Network</strong>
                <p style="font-size: 13px; color: #64748b; margin: 8px 0 0 0;">
                  Connect with security professionals
                </p>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="http://localhost:5173" class="button">
                🚀 Start Exploring CodeVirus
              </a>
            </div>
            
            <hr style="margin: 32px 0;" />
            
            <p style="font-size: 14px; color: #64748b;">
              Stay tuned for security insights, community updates, and expert discussions.
            </p>
            
            <p style="font-size: 14px; color: #64748b; margin-top: 24px;">
              Stay secure,<br />
              <strong style="color: #2563eb;">The CodeVirus Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">
              © ${new Date().getFullYear()} CodeVirus. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
};

export default transporter;