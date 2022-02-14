import { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js';

import { generateHinaInvite } from '../../utils/general.js';
import { hinaColor, hinaImageOption } from '../../res/config.js';


export default {

    name: 'invite',
    aliases: [],
    description: 'get my invite link.',





    async execute(Hina, msg, args) {

        const HinaInvite = await generateHinaInvite(Hina);

        const embed = new MessageEmbed()
            .setAuthor({name: 'My invite link♡', iconURL: Hina.user.displayAvatarURL(hinaImageOption)})
            .setColor(hinaColor)
            .setDescription(HinaInvite)
            .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
            .setTimestamp();

        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Invite Me!')
                    .setStyle('LINK')
                    .setURL(HinaInvite)
                    .setEmoji('<a:AquaBounce:884003530933944341>')
            );

        await msg.reply({ embeds: [embed], components: [button] });
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};