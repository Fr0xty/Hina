import { MessageEmbed } from 'discord.js';

import { hinaColor, hinaImageOption } from '../../res/config.js';


export default {

    name: 'epochtime',
    aliases: ['epoch'],
    description: 'get quick example of epochtime in discord.',





    async execute(client, msg, args) {

        const embed = new MessageEmbed()
            .setColor(hinaColor)
            .setAuthor({name: 'Epoch Time Example', iconURL: client.user.displayAvatarURL(hinaImageOption)})
            .setDescription(`
[Epoch Time Converter](https://www.epochconverter.com/) 

\`<t:1624855717>\` 	    <t:1624855717>	
\`<t:1624855717:f>\` 	<t:1624855717:f>
\`<t:1624855717:F>\` 	<t:1624855717:F>
\`<t:1624855717:d>\` 	<t:1624855717:d>
\`<t:1624855717:D>\` 	<t:1624855717:D>
\`<t:1624855717:t>\` 	<t:1624855717:t>
\`<t:1624855717:T>\` 	<t:1624855717:T>
\`<t:1624855717:R>\` 	<t:1624855717:R>
            `)
            .setFooter({text: `Requested by ${msg.author.tag}さま`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
            .setImage('https://cdn.discordapp.com/attachments/907586559719645204/908234637380288552/sheeeeeeeesh.jpeg')
            .setTimestamp();

        await msg.channel.send({ embeds: [embed] });
    },





    async slashExecute(client, interaction) {
        return;
    },
};