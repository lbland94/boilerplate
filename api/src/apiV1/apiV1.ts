import { Router } from 'express';
import { authRouter } from './auth/auth.route';
import { imageRouter } from './image/image.route';
import { roleRouter } from './role/role.route';
import { userRouter } from './users/user.route';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/image', imageRouter);
router.use('/role', roleRouter);

export default router;
