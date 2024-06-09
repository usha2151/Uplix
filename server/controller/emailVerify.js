import nodemailer from 'nodemailer';
import randomstring from 'randomstring';

// Generate OTP
const generateOTP = () => {
    return randomstring.generate({
      length: 6,
      charset: 'numeric'
    });
  };

  export const otpGenerate = (req,res) => {
    const { email } = req.body;
    console.log(email);
  const otp = generateOTP();
  console.log(otp);
  }

