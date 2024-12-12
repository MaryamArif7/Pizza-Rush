import mongoose from 'mongoose';
const addressSchema=new mongoose.Schema({
  id:String,
  address:String,
  city:String,
  phone:String,
  notes:String,



},{timestamps:true});
const Address=new mongoose.model("Address",addressSchema);
export default Address;