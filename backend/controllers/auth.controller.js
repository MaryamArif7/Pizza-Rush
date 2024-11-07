import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Otp from "../models/otp.model.js";
import validator from "validator";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
export const sendRegisterOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({
        message: "Email is required",
        success: false,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send({
        message: "Please provide a valid email",
        success: false,
      });
    }

    const isReg = await User.findOne({ email });
    if (isReg) {
      return res.status(400).send({
        message: "This email is already registered. Please enter a new email.",
        success: false,
      });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const hashedOTP = await bcrypt.hash(otp, 12);

    const newOtp = await Otp.create({
      email,
      otp: hashedOTP,
      name: "register-otp",
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verification for Pizza Rush",
      html: `<div class="container">
      <div class="header">
          <h1>Welcome to Pizza Rush!</h1>
      </div>
      <div class="content">
          <h2>Verify Your Email</h2>
          <p>Thank you for registering with us. Please enter the following OTP to verify your email:</p>
          <h2 style="color: #4CAF50;">${otp}</h2>
          <p>If you did not request this email, please ignore it.</p>
          <p>Best Regards,<br>Pizza Rush</p>
      </div>
      <div class="footer">
          <p>&copy; 2024 Pizza Rush. All rights reserved.</p>
      </div>
  </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error in sending the email from the backend:", error);
        return res.status(500).send({
          message: "Failed to send email. Please try again.",
          success: false,
        });
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    res.status(200).json({
      result: newOtp,
      message: "Register OTP sent successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in sending OTP:", error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const register = async (req, res) => {
  try {
    const { username, password, email, otp } = req.body;

    if (!username || !password || !email || !otp) {
      return res.status(400).send({
        message: "Please enter all required fields.",
        success: false,
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Please use a unique username.", success: false });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .send({ message: "This email is already registered.", success: false });
    }

    const otpdb = await Otp.find({ email });
    if (otpdb.length === 0) {
      return res.status(400).send({
        message: "Please enter a valid OTP. This has expired.",
        success: false,
      });
    }

    const register_otps = otpdb.filter((otp) => otp.name === "register-otp");
    const findedOTP = register_otps[register_otps.length - 1];
    const isValidOTP = await bcrypt.compare(otp, findedOTP.otp);

    if (!isValidOTP) {
      return res
        .status(400)
        .send({ message: "Invalid OTP entered.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email,
    });

    await Otp.deleteMany({ email });
    await user.save();

    return res
      .status(201)
      .send({ message: "User registered successfully.", success: true });

  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .send({ error: "An error occurred during registration." });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Username not found.", success: false });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res
        .status(400)
        .send({ message: "Incorrect email or password.", success: false });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.username}`,
        user:userData,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "An error occurred during login." });
  }
};
