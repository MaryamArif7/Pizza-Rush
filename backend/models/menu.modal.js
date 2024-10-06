import mongoose, { Schema } from "mongoose";
export const MenuSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true,
},
description:{
    type:String,
    required:true,
},




},{timestamps:true});
const MenuModel = mongoose.model('MenuModel', MenuSchema);
export default MenuModel;