import { NewsChannel, TextChannel } from 'discord.js';

import Hina from '../res/HinaClient.js';

Hina.on('messageCreate', async (msg): Promise<any> => {
    if (!(msg.channel instanceof NewsChannel || msg.channel instanceof TextChannel)) return;

    try {
        if (msg.webhookId || msg.author.bot) return;
        if (!(msg.content.length >= 3 && msg.content.startsWith(';') && msg.content.endsWith(';'))) return;

        const emojiName = msg.content.replaceAll(';', '');

        for (const [id, emoji] of msg.guild!.emojis.cache.entries()) {
            if (emoji.name === emojiName) {
                if (!msg.guild!.me!.permissions.has('MANAGE_WEBHOOKS')) {
                    return await msg.reply(
                        'Please enable "Manage Webhooks" permission for me in order to use this feature!'
                    );
                }

                const webhook = await msg.channel.createWebhook(msg.member!.displayName, {
                    avatar: msg.author.displayAvatarURL(Hina.imageOption),
                });
                await webhook.send(emoji.toString());
                await webhook.delete();
                await msg.delete();
                return;
            }
        }
    } catch {} // there is also a bot triggered by this event resulting in conflict
});
