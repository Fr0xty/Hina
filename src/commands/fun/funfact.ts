import { EmbedBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('funfact').setDescription('get a fun fact.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const req = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');

        if (req.status !== 200) {
            return await interaction.reply('Sorry, something went wrong went making the request. Please try again.');
        }
        const fact: any = await req.json();

        const embed = new EmbedBuilder()
            .setColor(Hina.color)
            .setAuthor({ name: 'Fun fact with Hina!', iconURL: Hina.user!.displayAvatarURL(Hina.imageOption) })
            .setFooter({
                text: `Requested by: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
            })
            .setTimestamp().setDescription(`
${fact.text.replace('`', '\\`')}

source: [here](${fact.source_url})
            `);
        await interaction.reply({ embeds: [embed] });
    }
}
