import  User  from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

export async function verifyUser(req, res, next) {
  try {
    const username =
      req.method === "GET" ? req.query.username : req.body.username;

    const userExists = await UserModel.findOne({ username });
    if (!userExists) {
      return res.status(404).send({ error: "User not found!" });
    }

    next();
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(401).send({ error: "Authentication error." });
  }
}

export async function register(req, res) {
  try {
    const { username, password,  email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ error: "Please use a unique username." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email." });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        password: hashedPassword,
        email,
      });

      await user.save();
      return res.status(201).send({ msg: "User registered successfully." });
    }

    return res.status(400).send({ error: "Password is required." });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .send({ error: "An error occurred during registration." });
  }
}
export async function login(req, res) {
    const { username, password } = req.body;

    try {
      
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ error: "Username not found." });
        }

        // Compare the password
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).send({ error: "Incorrect password." });
        }

       
        const token = jwt.sign(
          {
              userId: user._id,
              username: user.username,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
      );

      return res.status(200).send({
            msg: "Login successful!",
            username: user.username,
            token,
        });
    } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        return res.status(500).send({ error: "An error occurred during login." });
    }
}
export async function getUser(req, res) {
    const { username } = req.params;

    try {

        if (!username) {
            return res.status(400).send({ error: "Invalid Username" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ error: "Couldn't find the user." });
        }

        const { password, ...rest } = user.toObject(); 
    } catch (error) {
        console.error("Error retrieving user:", error); 
        return res.status(500).send({ error: "Cannot find user data." });
    }
}
export async function updateUser(req, res) {
    try {
      const { userId } = req.user; 
  
      if (!userId) {
        return res.status(401).send({ error: "User Not Found...!" });
      }
  
      const body = req.body;
  

      const result = await User.updateOne({ _id: userId }, body);
      
   
      if (result.nModified === 0) {
        return res.status(404).send({ error: "No records updated. User may not exist or no changes were made." });
      }
  
      return res.status(200).send({ msg: "Record Updated...!" });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).send({ error: "An error occurred while updating the user." });
    }
  
}
export async function generateOTP(req, res) {
    try {
      const otp = await otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      
      req.app.locals.OTP = otp;
      res.status(201).send({ code: otp });
    } catch (error) {
      console.error("Error generating OTP:", error);
      res.status(500).send({ error: "Failed to generate OTP" });
    }
  }
  
  export async function verifyOTP(req, res) {
    const { code } = req.query;
  
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(200).send({ msg: "Verified Successfully!" });
    }
  
    return res.status(400).send({ error: "Invalid OTP" });
  }
  
  export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
      return res.status(200).send({ flag: req.app.locals.resetSession });
    }
    return res.status(440).send({ error: "Session expired!" });
  }
  
  export async function resetPassword(req, res) {
    try {
      if (!req.app.locals.resetSession) {
        return res.status(440).send({ error: "Session expired!" });
      }
  
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send({ error: "Username not Found" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await User.updateOne(
        { username: user.username },
        { password: hashedPassword }
      );
  
      req.app.locals.resetSession = false; // reset session
      return res.status(200).send({ msg: "Password Updated Successfully!" });
  
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).send({ error: "An error occurred while resetting the password." });
    }
  }