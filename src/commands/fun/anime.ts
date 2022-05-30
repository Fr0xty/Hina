import fetch from 'node-fetch';
import { Message, MessageEmbed } from 'discord.js';
import { loadFile } from 'graphql-import-files';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import { Hina } from '../../res/config.js';

// TODO: fix avatar not working in webhook

export default class anime implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];
    gqlSchema: String;

    constructor() {
        this.name = 'anime';
        this.description = 'search for information on anime.';
        this.commandUsage = '<anime_name>';
        this.args = [
            new CommandArgument({ type: 'paragraph' }).setName('anime_name').setDescription('anime to search for.'),
        ];

        this.gqlSchema = loadFile('./schema/anilistAnime.gql');
    }

    async execute(msg: Message, args: string[]) {
        const [anime_name] = args;

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
                    name: anime_name,
                },
            }),
        });

        /**
         * errors when requesting
         */
        if (req.status === 404)
            return await msg.reply(`Did not find any anime with the search terms: \`${anime_name}\`.`);
        if (req.status !== 200) {
            return await msg.reply('Something went wrong with the request. Please try again in a while.');
        }

        /**
         * destructure info and replacing null values with dash
         */
        const {
            data: { Media: animeInfo },
        }: any = JSON.parse(JSON.stringify(await req.json()).replaceAll(':null,', ':"-",'));

        const embed = new MessageEmbed()
            .setTitle(`${animeInfo.title.native}\n${animeInfo.title.english}`)
            .setURL(`https://myanimelist.net/anime/${animeInfo.idMal}`)
            .setDescription(
                animeInfo.description
                    .replace(/(\r\n|\n|\r)/gm, '') // removes linebreaks
                    .replaceAll('<br>', '\n') // format <br> tags
                    .replace(/<\/?i>/gm, '*') // format <i> and </i> tags
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

        await msg.reply({ embeds: [embed] });
    }
}
