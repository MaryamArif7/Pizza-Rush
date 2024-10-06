import express from 'express';
import {
    register,
    verifyUser,
    login,
    getUser,
    generateOTP,
    verifyOTP,
    createResetSession,
    updateUser,
    resetPassword,
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
router.get('/generateOTP', verifyUser, localVariables, generateOTP); 
router.get('/verifyOTP', verifyUser, verifyOTP); 
router.get('/createResetSession', createResetSession); 
router.put('/updateuser', Auth, updateUser); 
router.put('/resetPassword', verifyUser, resetPassword); 
router.get('/menu',Menu)
export default router;
