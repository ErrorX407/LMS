import nodemailer from "nodemailer";
import * as dotenv from "dotenv"

dotenv.config();

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE), // true for 465, false for other ports
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    await transporter.sendMail({
        from: process.env.USER, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: text, // plain text body
    })

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email Not Sent -> ", error);
  }
};
