import { MessageEmbed, MessageActionRow } from 'discord.js';

import { generateClientInvite } from '../../utils/general.js';
import { hinaColor, hinaImageOption } from '../../res/config.js';


export default {

    name: 'invite',
    aliases: [],
    description: 'get my invite link.',





    async execute(client, msg, args) {

        const clientInvite = await generateClientInvite(client);

        const embed = new MessageEmbed()
            .setAuthor({name: 'My invite link♡', iconURL: client.user.displayAvatarURL(hinaImageOption)})
            .setColor(hinaColor)
            .setDescription(clientInvite)
            .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
            .setTimestamp();

        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Invite Me!')
                    .setStyle('LINK')
                    .setURL(clientInvite)
                    .setEmoji('<a:AquaBounce:884003530933944341>')
            );

        await msg.reply({ embeds: [embed], components: [button] });
    },





    async slashExecute(client, interaction) {
        return;
    },
};