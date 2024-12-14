import {addAddress,fetchAddress,editAddress,deleteAddress} from ".././controllers/address.controller.js";
import express from 'express'
 export const addressRouter=express.Router();
addressRouter.post("/address//add",addAddress);
addressRouter.get("/address/get/:id",fetchAddress);
addressRouter.put("/address/edit/:id/:addressId",editAddress);
addressRouter.delete("/address/delete/:id/:addressId",deleteAddress);


