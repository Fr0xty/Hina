import { Router } from 'express';

const router = Router();

import avatarhistoryRouter from './avatarhistory.js';
import infoRouter from './info.js';
import hinawebRouter from './hinaweb.js';

router.use('/avatar-history', avatarhistoryRouter);
router.use('/info', infoRouter);
router.use('/hinaweb', hinawebRouter);

export default router;
