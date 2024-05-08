import express, { Router } from 'express';
import { signIn, signUp } from '../controllers/authController';

const authRouter: Router = express.Router();

authRouter.post('/', signUp);
authRouter.post('/', signIn);

export default authRouter;