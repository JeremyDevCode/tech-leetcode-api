import { Router } from 'express';
import { generateCompanyYaml } from '../controllers/generateController.js';

const router = Router();

router.post('/:company', generateCompanyYaml);

export default router;
