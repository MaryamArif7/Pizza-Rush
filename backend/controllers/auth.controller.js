
import { User } from '../models/auth.model.js'; 
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import bcryptjs from 'bcryptjs'; 

export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
   
    if (!email || !name || !password) {0
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const userExist = await User.findOne({ email }); 
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: 'User Already Exists',
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      name,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token expires in 24 hours
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id); 
    res.status(201).json({
      success: true,
      message: 'User Created Successfully',
      user: {
        ...user._doc,
        password: undefined, 
      },
    });
  } catch (error) { 
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const login = async (req, res) => {
  // Add login logic here
};

export const logout = async (req, res) => {
  // Add logout logic here
};
