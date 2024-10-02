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
} from '../controllers/auth.controller.js';
import { registerMail } from '../controllers/mailer.js';
import Auth, { localVariables } from '../middleware/auth.js';

const router = express.Router();

/** POST Methods */
router.post('/register', register);          
router.post('/registerMail', registerMail);               
router.post('/authenticate', verifyUser, (req, res) => res.end()); 
router.post('/login', verifyUser, login); 

/** GET Methods */
router.get('/user/:username', getUser); 
router.get('/generateOTP', verifyUser, localVariables, generateOTP); 
router.get('/verifyOTP', verifyUser, verifyOTP); 
router.get('/createResetSession', createResetSession); 

/** PUT Methods */
router.put('/updateuser', Auth, updateUser); 
router.put('/resetPassword', verifyUser, resetPassword); 

export default router;
