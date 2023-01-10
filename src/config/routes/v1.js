import { Router } from 'express';
import AuthRoutes from '../../api/routes/routes.auth';
import AdminAuthRoutes from '../../api/routes/routes.adminAuth';
import AdminRoutes from '../../api/routes/routes.admin';

const router = Router();
router.use('/auth', AuthRoutes);
router.use('/auth/admin', AdminAuthRoutes);
router.use('/admin', AdminRoutes);

export default router;

