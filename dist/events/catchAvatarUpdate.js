import { Hina } from '../res/config.js';
Hina.on('userUpdate', async (oldUser, newUser) => {
    if (oldUser.displayAvatarURL() === newUser.displayAvatarURL())
        return;
    let userDocument = Hina.database.collection('users').doc(newUser.id);
    const fetchedUser = await userDocument.get();
    if (!fetchedUser.exists) {
        await userDocument.set({
            avatars: [oldUser.displayAvatarURL(), newUser.displayAvatarURL()],
        });
        return;
    }
    const fetchedUserData = fetchedUser.data();
    if (fetchedUserData.avatars.length === 100)
        fetchedUserData.avatars.shift();
    fetchedUserData.avatars.push(newUser.displayAvatarURL());
    await userDocument.update(fetchedUserData);
});
