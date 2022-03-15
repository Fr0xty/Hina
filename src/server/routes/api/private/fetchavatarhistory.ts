import { Router } from 'express';
import { Hina } from '../../../../res/config.js';

const router = Router();

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userDocument = await Hina.database.collection('users').doc(userId).get();

    if (!userDocument.exists) res.status(404).send('User is not recorded / invalid userId.');
    res.send(userDocument.data().avatars);
});

export default router;
