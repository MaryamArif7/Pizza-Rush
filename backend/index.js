import express from 'express';
import { configDotenv } from "dotenv";
import cors from 'cors'


const app=express();
app.listen(5000,()=>{
    console.log('Server is runing on `${PORT}`');
})