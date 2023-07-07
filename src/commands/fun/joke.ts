import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import { getUsernameOrTag } from '../../utils/user.js';

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('joke').setDescription('I will tell you a joke.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        /**
         * fetch joke
         */
        const req = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,racist,sexist');

        /**
         * return if api was unsuccessful
         */
        if (req.status !== 200)
            return await interaction.reply('Sorry, something went wrong went making the request. Please try again.');
        const joke: any = await req.json();

        /**
         * format joke based on its type
         */
        const content =
            joke.type === 'single'
                ? joke.joke
                : `${joke.setup.replace('`', '\\`')}\n||${joke.delivery.replace('`', '\\`')}||`;

        /**
         * build an embed and reply
         */
        const embed = new EmbedBuilder()
            .setColor(Hina.color)
            .setAuthor({ name: `Joke (${joke.category})`, iconURL: Hina.user!.displayAvatarURL(Hina.imageOption) })
            .setFooter({
                text: `Requested by: ${getUsernameOrTag(interaction.user)}`,
                iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
            })
            .setTimestamp()
            .setDescription(`${content}\n\n[source](https://v2.jokeapi.dev/)`);

        await interaction.reply({ embeds: [embed] });
    }
}
