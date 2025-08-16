import { Router } from 'express';
import { getInterviewsPage, getProblemPage, getCompanyProblemsPage } from '../controllers/interviewController.js';

const router = Router();

router.get('/', getInterviewsPage);

router.get('/:company', getCompanyProblemsPage);

router.get('/:company/:problem', getProblemPage);

export default router;
