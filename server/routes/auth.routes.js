import express from "express";
import {signup,login} from '../controllers/auth.controllers.js';


const router = express();

router.post('/login',login);
router.post('/signup',signup);


export default router;