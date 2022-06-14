import { Router } from 'express';

const router = Router();

import fetchavatarhistoryRouter from './private/fetchavatarhistory.js';
import hinawebRouter from './private/hinaweb.js';

router.use('/fetch-avatar-history', fetchavatarhistoryRouter);
router.use('/hinaweb', hinawebRouter);

export default router;
