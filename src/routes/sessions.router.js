import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

router.post('/register',sessionsController.register);
router.post('/login',sessionsController.login);
router.get('/current',sessionsController.current);
router.get('/unprotectedLogin',sessionsController.unprotectedLogin);
router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);
router.get('/logout',sessionsController.logout);

export default router;