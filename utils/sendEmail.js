const AppError = require('./appError');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: '../example.env' });

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465, // 25, 465, 2255
  secure: true,
  auth: {
    user: 'tyuhdima@meta.ua',
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: 'tyuhdima@meta.ua' };
 
  try {
      await transporter.sendMail(email);
      console.log('Email send success');
      return true;
  } catch (error) {
      console.log(error.message);
    return new AppError(400, 'Bad Request');
  }
};
module.exports = sendEmail;
