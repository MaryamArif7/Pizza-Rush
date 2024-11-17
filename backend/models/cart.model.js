import mongoose from 'mongoose';
const CartSchema=new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,

},
items:[

    {
        menuId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"MenuModel",
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
            min:1,
        },


    },
],





},{timestamps:true,});
const Cart=mongoose.model("Cart",CartSchema)