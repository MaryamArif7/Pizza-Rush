import express from 'express';
import  { checkoutSession,checkoutSuccess } from "../controllers/order.controller.js";
const orderRouter=express.Router();
orderRouter.post("/checkoutSession",checkoutSession);
orderRouter.post("/checkout-success",checkoutSuccess)
export default orderRouter;