import { Hina } from '../res/config.js';
import { avatarURLToAttachment } from '../utils/general.js';
Hina.on('userUpdate', async (oldUser, newUser) => {
    if (oldUser.displayAvatarURL() === newUser.displayAvatarURL())
        return;
    let userDocument = Hina.database.collection('users').doc(newUser.id);
    const fetchedUser = await userDocument.get();
    const newAvatarAttachment = await avatarURLToAttachment(newUser);
    if (!fetchedUser.exists) {
        return await userDocument.set({
            avatars: [newAvatarAttachment.url],
        });
    }
    const fetchedUserData = fetchedUser.data();
    if (fetchedUserData.avatars.length === 200)
        fetchedUserData.avatars.shift();
    fetchedUserData.avatars.push(newAvatarAttachment.url);
    await userDocument.update(fetchedUserData);
});
