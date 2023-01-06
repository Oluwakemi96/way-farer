import { Router } from 'express';
import AuthRoutes from '../../api/routes/routes.auth';

const router = Router();
router.use('/auth', AuthRoutes);

export default router;

