import { Router } from 'express';

import Hina from '../../../../res/HinaClient.js';
import { avatarURLToAttachment } from '../../../../utils/general.js';

const router = Router();

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userDocument = await Hina.database.collection('users').doc(userId);

    const userDocumentData = await userDocument.get();
    if (userDocumentData.exists) return res.send(userDocumentData.data().avatars);

    /**
     * Doesn't exists:
     * - not yet registered
     * - no common servers -> return 404
     */
    try {
        const user = await Hina.users.fetch(userId);
        console.log('fetch passed');

        const avatarAttachment = await avatarURLToAttachment(user);

        await userDocument.set({
            avatars: [avatarAttachment.url],
        });

        res.send([avatarAttachment.url]);
    } catch {
        res.status(404);
    }
});

export default router;
