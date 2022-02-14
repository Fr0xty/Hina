export default {

    name: 'prune',
    aliases: [],
    description: 'bulk delete a certain amount of messages in the channel.',





    async execute(Hina, msg, args) {

        if (!msg.member.permissions.has('MANAGE_MESSAGES')) return await msg.reply('You don\'t have the permission to use this command!\nrequire: `Manage Messages`');
        
        let num;
        if (!args.length) {
            num = 2;
        } 
        else if (!(args[0] > 0 && args[0] < 1001)) {
            return await msg.reply('Please provide 0 < __num__ < 1001.');
        }
        else { num = args[0]++ };

        await msg.channel.bulkDelete(num);
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};