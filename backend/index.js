import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();
//cors.config()

const PORT=5000 || process.env.PORT;

const app=express();
app.listen(PORT,()=>{
  
    console.log(`Server is runing on PORT ${PORT}`);
})