import express from 'express';
import {addToCart, deleteCartItem, fetchCartItems, updateCart} from "../controllers/cart.controller.js";
import { menuDetails } from '../controllers/menu.controller.js';
export const menuRouter=express.Router();
menuRouter.post("/cart/add",addToCart);
menuRouter.get("/cart/get/:id",fetchCartItems);
menuRouter.put("/cart/update-cart",updateCart);
menuRouter.post("/cart/:id/:menuId",deleteCartItem);
menuRouter.get("/get/:id", menuDetails);
