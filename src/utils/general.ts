import { Client, Guild, OAuth2Scopes, PartialUser, PermissionsBitField, User } from 'discord.js';

import Hina from '../res/HinaClient.js';

export const generateHinaInvite = async (Hina: Client) => {
    const invite = Hina.generateInvite({
        permissions: [PermissionsBitField.Flags.ModerateMembers],
        scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
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

export const extractCodeBlock = async (content: string) => {
    /**
     * extract code and language from the message content
     */
    const code = content.match(/(?<=\`\`\`.*\n).*(?=\`\`\`)/s)?.shift();
    const language = content.match(/(?<=\`\`\`).+(?=\n)/)?.shift();

    return { code, language };
};

