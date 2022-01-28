module.exports = {

    eventType: 'messageCreate',
    callback: async (msg) => {

        if (msg.content.length >= 3 && msg.content.startsWith(';') && msg.content.endsWith(';')) {

            let emojiName = msg.content.replaceAll(';', '');

            for (const [id, emoji] of msg.guild.emojis.cache.entries()) {
                if (emoji.name === emojiName) {
                    
                    const webhook = await msg.channel.createWebhook(msg.member.displayName, {
                        avatar: msg.author.avatarURL(),
                    });

                    await webhook.send(emoji.toString());
                    await webhook.delete();
                    await msg.delete();
                    return;
                }
            }
            
        }
    }
};