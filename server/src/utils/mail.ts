import nodemailer from "nodemailer";
import path from "path";

import EmailVerificationToken from "#/models/emailVerificationToken";
import {
  MAILTRAP_PASS,
  MAILTRAP_USER,
  VERIFICARIONEMAIL,
} from "#/utils/variables";
import { generateTemplate } from "#/mail/template";

const generateMailTransported = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });
  return transport;
};

interface Profile {
  name: String;
  email: String;
  userId: String;
}

export const sendVerificationMail = async (token: string, profile: Profile) => {
  const transport = generateMailTransported();

  const { name, email, userId } = profile;

  await EmailVerificationToken.create({
    owner: userId,
    token,
  });

  const welcomeMessage = `Hi ${name}, welcome to Podify! There are so much thing that we do for verified users. Use the given OTP to verify your mail.`;

  transport.sendMail({
    to: email,
    from: VERIFICARIONEMAIL,
    subject: "Welcome message",
    html: generateTemplate({
      title: "Welcome to Podify",
      message: welcomeMessage,
      logo: "cid:logo",
      banner: "cid:welcome",
      link: "#",
      btnTitle: token,
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "welcome.png",
        path: path.join(__dirname, "../mail/welcome.png"),
        cid: "welcome",
      },
    ],
  });
};
