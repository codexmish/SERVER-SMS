const nodemailer = require("nodemailer");
const envConfig = require("./envConfig");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: envConfig.SMTP_USER,
    pass: envConfig.SMTP_PASS,
  },
});

const mailSender = async ({ email, subject, mailTemp }) => {
  try {
    await transporter.sendMail({
      from: '"SRM Team" <team@srm.com>', // sender address
      to: email, // list of recipients
      subject: subject, // subject line
      html: mailTemp, // HTML body
    });
  } catch (error) {
    console.log("error while sending mail", error);
  }
};

module.exports = { mailSender };
