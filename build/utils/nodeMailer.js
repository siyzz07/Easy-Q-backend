"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
    },
});
const sendEmail = async (to, verifyUrl) => {
    try {
        const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <header style="background-color: #007bff; padding: 10px; color: #fff; text-align: center;">
          <h2>EasyQ</h2>
        </header>

        <main style="padding: 20px;">
          <h3>Verify Your Email</h3>
          <p>Please click the button below to verify your email address:</p>
          <p>
            <a href="${verifyUrl}" style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            ">Verify</a>
          </p>
          <p>If you did not request this, you can safely ignore this email.</p>
        </main>

        <footer style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #666;">
          &copy; ${new Date().getFullYear()} EasyQ. All rights reserved.
        </footer>
      </div>
    `;
        const info = await transporter.sendMail({
            from: `"EasyQ" <${process.env.NODEMAILER_EMAIL}>`,
            to,
            subject: "Verify Your Email",
            html: htmlContent,
        });
        console.log("Verification email sent:", info.messageId);
    }
    catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
};
exports.sendEmail = sendEmail;
