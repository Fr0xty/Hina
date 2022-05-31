import { Client, Guild, PartialUser, Permissions, User } from 'discord.js';

import Hina from '../res/HinaClient.js';

export const generateHinaInvite = async (Hina: Client) => {
    const invite = Hina.generateInvite({
        permissions: [Permissions.FLAGS.MODERATE_MEMBERS],
        scopes: ['bot', 'applications.commands'],
    });
    return invite;
};

export const guildOrHinaIcon = async (Hina: Client, guild: Guild) => {
    if (guild.iconURL()) return guild.iconURL(Hina.imageOption);
    return Hina.user!.displayAvatarURL(Hina.imageOption);
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const avatarURLToAttachment = async (user: User | PartialUser) => {
    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 4096, format: 'webp' });

    const msg = await Hina.avatarHistoryChannel.send({
        files: [
            {
                attachment: avatarURL,
                name: `${user.id}.${avatarURL.includes('.gif') ? 'gif' : 'png'}`,
            },
        ],
    });
    return msg.attachments.first()!;
};
