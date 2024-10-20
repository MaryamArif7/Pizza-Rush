import express from 'express';
import {
    register,
    verifyUser,
    login,
    getUser,
    generateOTP,
    verifyOTP,
    updateUser,
    
} from '../controllers/auth.controller.js'
import { registerMail } from '../controllers/mailer.js';
import Auth, { localVariables } from '../middleware/auth.js';
import {Menu} from "../controllers/menu.controller.js"
const router = express.Router();
router.post('/register', register);          
router.post('/registerMail', registerMail);               
router.post('/authenticate', verifyUser, (req, res) => res.end()); 
router.post('/login', verifyUser, login); 
router.get('/user/:username', getUser); 

router.put('/updateuser', Auth, updateUser); 
router.get('/menu',Menu)
export default router;
