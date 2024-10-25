import {MailtrapClient} from 'mailtrap';

import dotenv from 'dotenv';
dotenv.config();

export const mailtrapClient = new MailtrapClient({
  // endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN
})

export const sender = {
  email: "hello@demomailtrap.com",
  name: "indranil bera"
};


























// import Nodemailer from "nodemailer";
// import { MailtrapTransport } from "mailtrap"
// import dotenv from "dotenv";
// dotenv.config();

// const TOKEN = process.env.MAILTRAP_TOKEN;

// export const mailtrapClient = Nodemailer.createTransport(
//   MailtrapTransport({
//     token: TOKEN,
//   })
// );

// export const sender = {
//   address: "hello@demomailtrap.com",
//   name: "Indranil Bera",
// };
// const recipients = [
//   "ibera866@gmail.com",
// ];

// transport
//   .sendMail({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);