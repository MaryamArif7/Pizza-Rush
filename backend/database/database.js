import mongoose from "mongoose";
const connectDB =async()=>{
    try{
      await  mongoose.connect(process.env.DB_URI);
        console.log("MongoDB connected sucessfully")
    }
    catch{
        console.error("Failed to connect with Mongo")
    }
}
export default connectDB;