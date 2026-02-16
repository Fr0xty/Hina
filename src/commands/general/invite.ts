import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Client,
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import { generateHinaInvite } from '../../utils/general.js';
import { getUsernameOrTag } from '../../utils/user.js';

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('invite').setDescription('get my invite link.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const HinaInvite = await generateHinaInvite(Hina);

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'My invite link♡', iconURL: Hina.user!.displayAvatarURL(Hina.imageOption) })
            .setColor(Hina.color)
            .setDescription(HinaInvite)
            .setFooter({
                text: `Requested by: ${getUsernameOrTag(interaction.user)}`,
                iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
            })
            .setTimestamp();

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setLabel('Invite Me!')
                .setStyle(ButtonStyle.Link)
                .setURL(HinaInvite)
                .setEmoji('<a:AquaBounce:884003530933944341>')
        );

        await interaction.reply({
            embeds: [embed],
            components: [row],
        });
    }
}
