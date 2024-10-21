import mongoose from 'mongoose';
export const OtpSchema=new mongoose.Schema({
      
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 300 }

    }


},{timestamps:true});
const Otp=mongoose.model('Otp',OtpSchema);
export default Otp;