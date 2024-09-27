// index.js
import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import connectDB from "./database/database.js";

const app = express();
dotenv.config({});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    connectDB();  
    console.log(`Server is running on PORT ${PORT}`);

app.get('/', (req, res) => {
    res.send('Server is running');
});
});