import { Hina } from '../res/config.js';
import { avatarURLToAttachment } from '../utils/general.js';

/**
 * catches member's avatar update
 * - add to user avatar history in firebase
 */
Hina.on('userUpdate', async (oldUser, newUser) => {
    /**
     * return if it's not avatar that's changed
     */
    if (oldUser.displayAvatarURL() === newUser.displayAvatarURL()) return;

    /**
     * get user from firebase
     */
    let userDocument: FirebaseFirestore.DocumentReference = Hina.database.collection('users').doc(newUser.id);
    const fetchedUser = await userDocument.get();

    /**
     * if user isn't registered, register now
     */
    const newAvatarAttachment = await avatarURLToAttachment(newUser);
    if (!fetchedUser.exists) {
        const oldAvatarAttachment = await avatarURLToAttachment(oldUser);

        await userDocument.set({
            avatars: [oldAvatarAttachment.url, newAvatarAttachment.url],
        });
        return;
    }

    /**
     * get user avatars
     */
    const fetchedUserData = fetchedUser.data()!;

    /**
     * only store last 200 avatars
     */
    if (fetchedUserData.avatars.length === 200) fetchedUserData.avatars.shift();

    /**
     * add new avatar and update
     */
    fetchedUserData.avatars.push(newAvatarAttachment.url);
    await userDocument.update(fetchedUserData);
});
