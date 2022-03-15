import { Message, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import { Hina } from '../../res/config.js';
import { generateHinaInvite } from '../../utils/general.js';

export default class invite implements BaseCommand {
    name: String;
    description: String;

    constructor() {
        this.name = 'invite';
        this.description = 'get my invite link.';
    }

    async execute(msg: Message, args: string[]) {
        const HinaInvite = await generateHinaInvite(Hina);

        const embed = new MessageEmbed()
            .setAuthor({ name: 'My invite link♡', iconURL: Hina.user!.displayAvatarURL(Hina.imageOption) })
            .setColor(Hina.color)
            .setDescription(HinaInvite)
            .setFooter({
                text: `Requested by: ${msg.author.tag}`,
                iconURL: msg.author.displayAvatarURL(Hina.imageOption),
            })
            .setTimestamp();

        const button = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Invite Me!')
                .setStyle('LINK')
                .setURL(HinaInvite)
                .setEmoji('<a:AquaBounce:884003530933944341>')
        );

        await msg.reply({ embeds: [embed], components: [button] });
    }
}
