import { Router } from 'express';
import AuthRoutes from '../../api/routes/routes.auth';
import AdminAuthRoutes from '../../api/routes/routes.adminAuth';
import AdminRoutes from '../../api/routes/routes.trip';

const router = Router();
router.use('/auth', AuthRoutes);
router.use('/auth/admin', AdminAuthRoutes);
router.use('/trip', AdminRoutes);

export default router;

