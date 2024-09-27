import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from 'cors';
import connectDB from "./database/database.js";
dotenv.config({});
app.use(express.json());
app.use(express.urlencoded());
const corsOpitons={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOpitons))
app.use(cookieParser())
const PORT=5000 || process.env.PORT;

const app=express();
app.listen(PORT,()=>{
     connectDB();
    console.log(`Server is runing on PORT ${PORT}`);
})