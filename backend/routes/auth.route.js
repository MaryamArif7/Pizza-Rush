import express from 'express';
import {
    register,
    login,
    sendRegisterOtp

    
} from '../controllers/auth.controller.js'

import {Menu} from "../controllers/menu.controller.js"
const authRouter = express.Router();
authRouter.post('/register', register);          
authRouter.post('/login',  login); 
authRouter.post('/send-register-otp',sendRegisterOtp)


authRouter.get('/menu',Menu)
export default authRouter;
