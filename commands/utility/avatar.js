import { MessageEmbed } from 'discord.js';

import { hinaColor, hinaImageOption } from '../../res/config.js';


export default {

    name: 'avatar',
    aliases: [],
    description: 'get user profile avatar.',





    async execute(Hina, msg, args) {

        let user;
        if (!args.length) { user = msg.author }
        else { user = await Hina.users.fetch(args[0].match(/\d+/)[0]) };

        if (!user) return await msg.reply('Invalid user id / mention!');

        const embed = new MessageEmbed()
            .setColor(hinaColor)
            .setAuthor({name: 'Hina\'s Avatar Fetcher', iconURL: Hina.user.displayAvatarURL(hinaImageOption)})
            .setTitle(`${user.tag}'s Avatar'`)
            .setDescription(`
[\`webp\`](${user.displayAvatarURL({dynamic: true, format: 'webp', size:4096})}) [\`png\`](${user.displayAvatarURL({dynamic: true, format: 'png', size:4096})}) [\`jpg\`](${user.displayAvatarURL({dynamic: true, format: 'jpg', size:4096})}) [\`jpeg\`](${user.displayAvatarURL({dynamic: true, format: 'jpeg', size:4096})}) 
            `)
            .setImage(user.displayAvatarURL(hinaImageOption))
            .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
            .setTimestamp();

        await msg.reply({ embeds: [embed] });
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};