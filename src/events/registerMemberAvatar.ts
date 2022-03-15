import { Hina } from '../res/config.js';

/**
 * to register every member to firebase
 * - store avatarURL for avatar history command
 */
Hina.on('guildCreate', async (guild) => {
    // fetch every member in guild
    const members = await guild.members.fetch();

    // remove Hina from collection
    members.delete(Hina.user!.id);

    for (const [memberId, member] of members) {
        // fetch users from firebase
        const memberProfile = await Hina.database.collection('users').doc(memberId).get();

        // skip if already registered
        if (memberProfile.exists) continue;

        // register into firebase
        await Hina.database
            .collection('users')
            .doc(memberId)
            .set({
                avatars: [member.displayAvatarURL()],
            });
    }
});
