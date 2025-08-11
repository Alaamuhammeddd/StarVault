const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  if (process.env.NODE_ENV === "development") {
    console.log("=== EMAIL SIMULATION ===");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Message:", text);
    console.log("========================");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
}

module.exports = sendEmail;
