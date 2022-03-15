import { Router } from 'express';
import { Hina } from '../../../../res/config.js';

const router = Router();

router.get('/statistics', async (req, res) => {
    const guildCount = Hina.guilds.cache.size;
    const memberCount = Hina.users.cache.size;
    const commandCount = Hina.commands.size;

    res.json({
        guildIn: guildCount,
        memberCount: memberCount,
        commandCount: commandCount,
    });
});

export default router;
