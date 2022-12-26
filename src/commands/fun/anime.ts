import anilistAnimeGraphql from '../../schema/anilistAnime.graphql.js';
import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    gqlSchema: string;

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('anime')
                .setDescription('search for information on anime.')
                .addStringOption((option) =>
                    option.setName('anime_name').setDescription('anime to search for.').setRequired(true)
                )
        );

        /**
         * gql query schema to fetch required information
         */
        this.gqlSchema = anilistAnimeGraphql;
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            anime_name: interaction.options.get('anime_name')!.value as string,
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
                    name: args.anime_name,
                },
            }),
        });

        /**
         * errors when requesting
         */
        if (req.status === 404)
            return await interaction.reply(`Did not find any anime with the search terms: \`${args.anime_name}\`.`);
        if (req.status !== 200) {
            return await interaction.reply('Something went wrong with the request. Please try again in a while.');
        }

        /**
         * destructure info and replacing null values with dash
         */
        const {
            data: { Media: animeInfo },
        }: any = JSON.parse(JSON.stringify(await req.json()).replaceAll(':null,', ':"-",'));

        const embed = new EmbedBuilder()
            .setTitle(`${animeInfo.title.native}\n${animeInfo.title.english}`)
            .setURL(`https://myanimelist.net/anime/${animeInfo.idMal}`)
            .setDescription(
                animeInfo.description
                    .replace(/(\r\n|\n|\r)/gm, '') // removes linebreaks
                    .replaceAll('<br>', '\n') // format <br> tags
                    .replace(/<\/?i>/gm, '*') // format <i> and </i> tags
                    .replace(/<\/?b>/gm, '**') // format <b> and </b> tags
            )
            .setColor(Hina.color)
            .setThumbnail(animeInfo.coverImage[Object.keys(animeInfo.coverImage)[0]])
            .setFields([
                { name: 'Format', value: animeInfo.format, inline: true },
                { name: 'Status', value: animeInfo.status, inline: true },
                {
                    name: 'Season',
                    value: animeInfo.season === '-' ? '-' : `${animeInfo.season} ${animeInfo.seasonYear}`,
                    inline: true,
                },
                { name: 'Episodes', value: String(animeInfo.episodes), inline: true },
                { name: 'Duration', value: String(animeInfo.duration), inline: true },
                { name: 'Popularity', value: `#${animeInfo.popularity}`, inline: true },
                { name: 'Average Score', value: `${animeInfo.averageScore} / 100`, inline: true },
                { name: 'Source', value: animeInfo.source, inline: true },
                { name: 'Genres', value: animeInfo.genres.toString().replaceAll(',', ', '), inline: false },
            ]);

        await interaction.reply({ embeds: [embed] });
    }
}
