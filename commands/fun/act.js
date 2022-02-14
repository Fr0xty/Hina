import { hinaImageOption } from '../../res/config.js';


export default {

    name: 'act',
    aliases: [],
    description: 'impersonate the user to say things.',





    async execute(Hina, msg, args) {
        
        if (args.length < 2) {
            await msg.reply('Please provide a user and a message');
            return;
        }
        let id = args.shift();
        id = id.match(/[0-9]+/);
        const userMsg = args.join(' ');

        try {
            const member = msg.mentions.members.first();
            
            const webhook = await msg.channel.createWebhook(member.displayName, {
                avatar: member.displayAvatarURL(hinaImageOption)
            });

            await webhook.send(userMsg);
            await webhook.delete();
            await msg.delete();
            return;
        }
        catch (err) {
            console.log(err);
            await msg.reply('User is invalid or is not in the server!');
        };
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};