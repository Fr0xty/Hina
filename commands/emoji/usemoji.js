import { hinaImageOption } from '../../res/config.js';


export default {

    name: 'usemoji',
    aliases: [],
    description: 'send the emoji as you!',





    async execute(client, msg, args) {
        
        const emojiRegex = /^a?:.+:([0-9]{18})$/;

        if (!emojiRegex.test(args[0])) return await msg.reply('Invalid emoji id! Please make sure to copy the whole emoji id without the angle brackets.');

        const webhook = await msg.channel.createWebhook(msg.member.displayName, {
            avatar: msg.author.displayAvatarURL(hinaImageOption),
        });

        await webhook.send(`<${args}>`);
        await webhook.delete();
        await msg.delete();
    },





    async slashExecute(client, interaction) {
        return;
    },
};