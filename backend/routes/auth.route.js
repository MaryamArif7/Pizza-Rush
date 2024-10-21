import express from 'express';
import {
    register,
    login,

    
} from '../controllers/auth.controller.js'

import {Menu} from "../controllers/menu.controller.js"
const authRouter = express.Router();
authRouter.post('/register', register);          
authRouter.post('/login',  login); 



router.get('/menu',Menu)
export default router;
