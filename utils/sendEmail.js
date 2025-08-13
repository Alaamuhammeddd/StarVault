// utils/sendEmail.js
const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  if (process.env.NODE_ENV === "development") {
    console.log("\n=== EMAIL SIMULATION ===");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Message:", text);
    console.log("========================\n");
    return;
  }

  // Production mode: use SMTP (Resend, SendGrid, Mailtrap, etc.)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., "smtp.resend.com" or "smtp.sendgrid.net"
    port: process.env.SMTP_PORT, // usually 587
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // e.g., "apikey" for SendGrid
      pass: process.env.SMTP_PASS, // your API key or SMTP password
    },
  });

  await transporter.sendMail({
    from: `"No Reply" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    text,
  });
}

module.exports = sendEmail;
