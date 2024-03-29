import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import { interactionPaginator } from '../../utils/paginator.js';
import { getUsernameOrTag } from '../../utils/user.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('jisho')
                .setDescription('search for a word from jisho.org')
                .addStringOption((option) => option.setName('search').setDescription('search term.').setRequired(true))
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            search: interaction.options.get('search')!.value as string,
        };

        const req = await fetch(`https://jisho.org/api/v1/search/words?keyword=${args.search}`);
        const result = await req.json();

        if (result.meta.status !== 200)
            return await interaction.reply(`No result was found with the search term \`${args.search}\`.`);

        let pages: EmbedBuilder[] = [];
        for (let i = 0; i < result.data.length; i++) {
            const wordResult = result.data[i];

            let tagList = [];
            // jlptLevel, isCommon, wakinaki?
            wordResult.jlpt.length
                ? tagList.push(wordResult.jlpt[0].replace('-', ' ').toUpperCase())
                : tagList.push('JLPT ??');
            wordResult.is_common ? tagList.push('common') : tagList.push('uncommon');
            if (wordResult.tags.length) tagList.push(wordResult.tags[0]);
            const tags = JSON.stringify(tagList).replaceAll('"', '').replaceAll(',', ', ').slice(1, -1);

            const sences = wordResult.senses;
            let definitions = '';
            let _ = 1;
            sences.forEach((sence: any) => {
                definitions += `${_++}. ${JSON.stringify(sence.english_definitions)
                    .replaceAll('"', '')
                    .replaceAll(',', ', ')
                    .slice(1, -1)}\n`;
            });

            let dbpediaRedirect;
            if (wordResult.attribution.dbpedia) {
                dbpediaRedirect = `[Meaning Explanation](${wordResult.attribution.dbpedia.replace('http', 'https')})`;
            } else {
                dbpediaRedirect = '';
            }

            let alternativeKanji = '**Alternative Writing**\n';
            const firstReading = wordResult.japanese.shift();
            if (wordResult.japanese.length) {
                wordResult.japanese.forEach((alt: any) => {
                    if (alt.word && alt.reading) alternativeKanji += `-${alt.word} (${alt.reading})\n`;
                    else if (alt.word) alternativeKanji += `-${alt.word}\n`;
                    else alternativeKanji += `-${alt.reading}\n`;
                });
            } else {
                alternativeKanji = '';
            }

            const embed = new EmbedBuilder()
                .setColor(Hina.color)
                .setAuthor({
                    name: `Hina Jisho (Page ${i + 1} / ${result.data.length})`,
                    iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
                })
                .setTitle(`${firstReading.word} (${firstReading.reading})`)
                .setURL(`https://jisho.org/search/${wordResult.slug}`)
                .setDescription(
                    `
\`${tags}\`
${definitions}
${alternativeKanji}
${dbpediaRedirect}
-------------------------
                `
                )
                .setFooter({
                    text: `Requested by ${getUsernameOrTag(interaction.user)}`,
                    iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
                })
                .setTimestamp();

            pages.push(embed);
        }
        await interactionPaginator(interaction, pages, 300_000);
    }
}
