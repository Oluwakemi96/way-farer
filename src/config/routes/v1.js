import { Router } from 'express';
import AuthRoutes from '../../api/routes/routes.auth';
import AdminAuthRoutes from '../../api/routes/routes.adminAuth';

const router = Router();
router.use('/auth', AuthRoutes);
router.use('/auth/admin', AdminAuthRoutes);

export default router;

