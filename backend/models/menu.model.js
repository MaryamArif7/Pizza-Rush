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
image:{
    type:String,
    required:true,
},
ingridents:{
  base:{
    type:String,
    reuqired:true,
  },
  toppings:{
    type:[String],
    required:true,
  }
    
},
size:{
    type:String,
    required:true,
}




},{timestamps:true});
const MenuModal = mongoose.model('MenuModal', MenuSchema);
export default MenuModal;