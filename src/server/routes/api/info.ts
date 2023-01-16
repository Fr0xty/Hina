import 'dotenv/config';
import { Router } from 'express';

const router = Router();

router.get('/bot-invite', async (req, res) => {
    res.send(process.env.HINA_INVITE_URL!);
});

router.get('/repository', async (req, res) => {
    res.json({
        bot: 'https://github.com/Fr0xty/Hina',
        hinaweb: 'https://github.com/Fr0xty/hinaweb',
    });
});

export default router;
