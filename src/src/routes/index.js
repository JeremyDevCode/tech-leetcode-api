import { Router } from 'express';
import interviewRoutes from './interviewRoutes.js';
import generateRoutes from './generateRoutes.js';

const router = Router();

router.use('/interviews', interviewRoutes);
router.use('/generate', generateRoutes);

export default router;
