import express from 'express';
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './database/database.js'; 
import authRouter from './routes/auth.route.js';
import Menu from './database/Menu.js' ;
import MenuModal from "./models/menu.model.js"
import path from 'path';
import { fileURLToPath } from 'url';
import { menuRouter } from './routes/menu.route.js';
import {addressRouter} from "./routes/address.route.js"
import orderRouter from "./routes/order.route.js"
const app = express();
dotenv.config(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5173',

  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use("/api/auth", authRouter);
app.use("/api",authRouter);
app.use("/api/menu",menuRouter);
app.use("/api/shop",addressRouter);
app.use("/api/payment",orderRouter);



app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server issss running');
});
//adding menu items
/*
MenuModal.insertMany(Menu)
  .then(() => {
    console.log("Menu items inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting menu items:", error);
  })
   */