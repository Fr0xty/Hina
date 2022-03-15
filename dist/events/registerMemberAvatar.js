import { Hina } from '../res/config.js';
Hina.on('guildCreate', async (guild) => {
    const members = await guild.members.fetch();
    members.delete(Hina.user.id);
    for (const [memberId, member] of members) {
        const memberProfile = await Hina.database.collection('users').doc(memberId).get();
        if (memberProfile.exists)
            continue;
        await Hina.database
            .collection('users')
            .doc(memberId)
            .set({
            avatars: [member.displayAvatarURL()],
        });
    }
});
