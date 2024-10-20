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
        console.error("Login error:", error); 
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