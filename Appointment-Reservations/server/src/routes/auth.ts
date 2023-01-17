import express from 'express';
import { loginController, logoutController } from '../controllers/auth.controllers';
const router = express.Router()

declare module 'express-session' {
    export interface SessionData {
        provider: { [key: string]: any };
    }
}

router.post('/login',loginController);
router.post('/logout', logoutController);

export default router;