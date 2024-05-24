import { updateResetTokenDateAndId } from "@/data/password-reset-token";
import { updateTwoFactorTokenDateAndId } from "@/data/two-factor-token";
import { updateVertificationTokenDateAndId } from "@/data/verification-token";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVertificationEmail = async (email: string, token: string) => {
  const confirmLink = `https://tahinli.com.tr:3434/auth/new-vertification?token=${token}`;
  console.log("confirmLink", confirmLink);

  const info = await transporter.sendMail({
    from: `"Acapair 🎓" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Lütfen e-posta adresinizi doğrulayın",
    text: "EPosta Doğrulama",
    html: `<p> Lütfen e-posta adresinizi <a href="${confirmLink}">doğrulayın</a>. ✅</p>`,
  });

  await updateVertificationTokenDateAndId(token, info.messageId);
};

export const sendPasswordResetMail = async (email: string, token: string) => {
  const confirmLink = `https://tahinli.com.tr:3434/auth/new-password?token=${token}`;

  const info = await transporter.sendMail({
    from: `"Acapair 🎓" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Şifre Sıfırma Bağlantısı",
    text: "şifre sıfırlama",
    html: `<p>Şifrenizi değiştirmek için <a href="${confirmLink}">tıklayınız</a>. 🔄</p>`,
  });
  await updateResetTokenDateAndId(token, info.messageId);
};

export const sendTwoFactorMail = async (email: string, token: string) => {
  const info = await transporter.sendMail({
    from: `"Acapair 🎓" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Doğrulama kodu",
    text: "doğrulama kodu",
    html: `<p>Doğrulama kodunuz: <b><u>${token}</u></b>. 🔐</p>`,
  });
  await updateTwoFactorTokenDateAndId(token, info.messageId);
};
