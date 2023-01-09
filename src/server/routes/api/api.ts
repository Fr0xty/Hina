import { Router } from 'express';

const router = Router();

import avatarhistoryRouter from './avatarhistory.js';
import hinawebRouter from './hinaweb.js';

router.use('/avatar-history', avatarhistoryRouter);
router.use('/hinaweb', hinawebRouter);

export default router;
