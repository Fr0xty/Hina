import { Router } from 'express';
import { Hina } from '../../../../res/config.js';

const router = Router();

router.get('/statistics', async (req, res) => {
    const guildCount = Hina.guilds.cache.size;
    const userCount = Hina.users.cache.size;
    const commandCount = Hina.commands.size;

    res.json({
        guildCount: guildCount,
        userCount: userCount,
        commandCount: commandCount,
    });
});

export default router;
