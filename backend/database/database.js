import mongoose from "mongoose";
const connectDB =async()=>{
    try{
      await  mongoose.connect(process.env.DB_URI);
        console.log("MongoDB connected sucessfully")
    }
    catch(error){
        console.error("Failed to connect with Mongo",error)
    }
}
export default connectDB;