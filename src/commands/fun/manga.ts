import anilistMangaGraphql from '../../schema/anilistManga.graphql.js';
import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';

export default class extends BaseCommand {
    gqlSchema: string;

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('manga')
                .setDescription('search for information on manga.')
                .addStringOption((option) =>
                    option.setName('manga_title').setDescription('manga to search for.').setRequired(true)
                )
        );

        /**
         * gql query schema to fetch required information
         */
        this.gqlSchema = anilistMangaGraphql;
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            manga_title: interaction.options.get('manga_title')!.value as string,
        };

        /**
         * fetch info from api
         */
        const req = await fetch('https://graphql.anilist.co', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query: this.gqlSchema,
                variables: {
                    name: args.manga_title,
                },
            }),
        });

        /**
         * errors when requesting
         */
        if (req.status === 404)
            return await interaction.reply(`Did not find any manga with the search terms: \`${args.manga_title}\`.`);
        if (req.status !== 200) {
            return await interaction.reply('Something went wrong with the request. Please try again in a while.');
        }

        /**
         * destructure info and replacing null values with dash
         */
        const {
            data: { Media: mangaInfo },
        }: any = JSON.parse(JSON.stringify(await req.json()).replaceAll(':null,', ':"-",'));

        const embed = new EmbedBuilder()
            .setTitle(`${mangaInfo.title.native}\n${mangaInfo.title.english}`)
            .setURL(`https://myanimelist.net/manga/${mangaInfo.idMal}`)
            .setDescription(
                mangaInfo.description
                    .replace(/(\r\n|\n|\r)/gm, '') // removes linebreaks
                    .replaceAll('<br>', '\n') // format <br> tags
                    .replace(/<\/?i>/gm, '*') // format <i> and </i> tags
                    .replace(/<\/?b>/gm, '**') // format <b> and </b> tags
            )
            .setColor(Hina.color)
            .setThumbnail(mangaInfo.coverImage[Object.keys(mangaInfo.coverImage)[0]])
            .setFields([
                { name: 'Format', value: mangaInfo.format, inline: true },
                { name: 'Status', value: mangaInfo.status, inline: true },
                { name: 'Chapters', value: String(mangaInfo.chapters), inline: true },
                { name: 'Popularity', value: `#${mangaInfo.popularity}`, inline: true },
                { name: 'Average Score', value: `${mangaInfo.averageScore} / 100`, inline: true },
                { name: 'Source', value: mangaInfo.source, inline: true },
                { name: 'Genres', value: mangaInfo.genres.toString().replaceAll(',', ', '), inline: false },
            ]);

        await interaction.reply({ embeds: [embed] });
    }
}
