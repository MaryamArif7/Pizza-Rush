import  User  from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export  const  register=async(req, res)=> {
  try {
    const { username, password,  email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "Please use a unique username.",
        success:false,
       });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ message: "Please use a unique email.",success:false, });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        password: hashedPassword,
        email,
      });

      await user.save();
      return res.status(201).send({ message: "User registered successfully.",success:true, });
    }

    return res.status(400).send({ message: "Password is required." });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .send({ error: "An error occurred during registration." });
  }
}
export const login=async(req, res)=> {
    const { username, password } = req.body;

    try {
      
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "Username not found.",
              success:false,
             });
        }


        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).send({message: "Incorrect email or password.",
              success: false,});
        }
        const tokenData = {
          userId: user._id,
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        user={
          _id:user._id,
          username:user.username,
          email:user.email,

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
          user,
          success: true,
        });
    } catch (error) {
        console.error("Login error:", error); 
        return res.status(500).send({ message: "An error occurred during login." });
    }
}

