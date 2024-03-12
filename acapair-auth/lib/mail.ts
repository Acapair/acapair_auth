const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export const sendVertificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-vertification?token=${token}`;

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Acapair 🎓" <${process.env.EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Lütfen e-posta adresinizi doğrulayın", // Subject line
    text: "EPosta Doğrulama", // plain text body
    html: `<p> Lütfen e-posta adresinizi <a href="${confirmLink}">doğrulayın</a>.</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
