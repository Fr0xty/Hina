import { Permissions } from 'discord.js';
import { Hina } from '../res/config.js';
export const generateHinaInvite = async (Hina) => {
    const invite = Hina.generateInvite({
        permissions: [Permissions.FLAGS.MODERATE_MEMBERS],
        scopes: ['bot', 'applications.commands'],
    });
    return invite;
};
export const guildOrHinaIcon = async (Hina, guild) => {
    if (guild.iconURL())
        return guild.iconURL(Hina.imageOption);
    return Hina.user.displayAvatarURL(Hina.imageOption);
};
export const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export const avatarURLToAttachment = async (user) => {
    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 4096, format: 'webp' });
    const msg = await Hina.avatarHistoryChannel.send({
        files: [
            {
                attachment: avatarURL,
                name: `${user.id}.${avatarURL.includes('.gif') ? 'gif' : 'png'}`,
            },
        ],
    });
    return msg.attachments.first();
};
