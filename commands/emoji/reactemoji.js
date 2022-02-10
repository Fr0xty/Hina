export default {

    name: 'reactemoji',
    aliases: [],
    description: 'react to messages using the emoji.',





    async execute(client, msg, args) {

        if (!msg.reference) return await msg.reply('Please reply to the message you want to react to while using the command!');
        if (!args) return await msg.reply('Please provide the emoji id.');

        const theMsg = await msg.fetchReference();
        
        try { 
            await theMsg.react(args[0]);
            await msg.delete();
        }
        catch { await msg.reply(`Invalid emoji id: ${args[0]}`)};
    },





    async slashExecute(client, interaction) {
        return;
    },
};