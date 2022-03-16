import { Hina } from '../res/config.js';

/**
 * catches member's avatar update
 * - add to user avatar history in firebase
 */
Hina.on('userUpdate', async (oldUser, newUser) => {
    // return if it's not avatar that's changed
    if (oldUser.displayAvatarURL() === newUser.displayAvatarURL()) return;

    // get user from firebase
    let userDocument: FirebaseFirestore.DocumentReference = Hina.database.collection('users').doc(newUser.id);
    const fetchedUser = await userDocument.get();

    // if for some reason user isn't registered, register now
    if (!fetchedUser.exists) {
        await userDocument.set({
            avatars: [oldUser.displayAvatarURL(Hina.imageOption), newUser.displayAvatarURL(Hina.imageOption)],
        });
        return;
    }

    // get user avatars
    const fetchedUserData = fetchedUser.data()!;

    // only store last 100 avatars
    if (fetchedUserData.avatars.length === 100) fetchedUserData.avatars.shift();

    // add new avatar and update
    fetchedUserData.avatars.push(newUser.displayAvatarURL(Hina.imageOption));
    await userDocument.update(fetchedUserData);
});
