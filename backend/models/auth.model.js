import mongoose from "mongoose";
export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a unique Username"],
    unique: [true, "Username already exists"], 
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false, 
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true, 
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
  
}, {
  timestamps: true, 
});

const User = mongoose.model('User', UserSchema);

export default User;
