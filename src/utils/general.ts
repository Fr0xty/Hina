import { Client, Guild, Permissions } from 'discord.js';

import { hinaImageOption } from '../res/config.js';

export const generateHinaInvite = async (Hina: Client) => {
    const invite = Hina.generateInvite({
        permissions: [Permissions.FLAGS.MODERATE_MEMBERS],
        scopes: ['bot', 'applications.commands'],
    });
    return invite;
};

export const guildOrHinaIcon = async (Hina: Client, guild: Guild) => {
    if (guild.iconURL()) return guild.iconURL(hinaImageOption);
    return Hina.user!.displayAvatarURL(hinaImageOption);
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
