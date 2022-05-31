import fetch from 'node-fetch';
import { Client, Message, MessageEmbed } from 'discord.js';
import { loadFile } from 'graphql-import-files';

import CommandArgument from '../../res/models/CommandArgument.js';
import { BaseCommand } from 'hina';

export default class manga implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];
    gqlSchema: String;

    constructor() {
        this.name = 'manga';
        this.description = 'search for information on manga.';
        this.commandUsage = '<manga_name>';
        this.args = [
            new CommandArgument({ type: 'paragraph' }).setName('manga_name').setDescription('manga to search for.'),
        ];

        this.gqlSchema = loadFile('./schema/anilistManga.gql');
    }

    async execute(Hina: Client, msg: Message, args: string[]) {
        const [manga_name] = args;

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
                    name: manga_name,
                },
            }),
        });

        /**
         * errors when requesting
         */
        if (req.status === 404)
            return await msg.reply(`Did not find any manga with the search terms: \`${manga_name}\`.`);
        if (req.status !== 200) {
            return await msg.reply('Something went wrong with the request. Please try again in a while.');
        }

        /**
         * destructure info and replacing null values with dash
         */
        const {
            data: { Media: mangaInfo },
        }: any = JSON.parse(JSON.stringify(await req.json()).replaceAll(':null,', ':"-",'));

        const embed = new MessageEmbed()
            .setTitle(`${mangaInfo.title.native}\n${mangaInfo.title.english}`)
            .setURL(`https://myanimelist.net/manga/${mangaInfo.idMal}`)
            .setDescription(
                mangaInfo.description
                    .replace(/(\r\n|\n|\r)/gm, '') // removes linebreaks
                    .replaceAll('<br>', '\n') // format <br> tags
                    .replace(/<\/?i>/gm, '*') // format <i> and </i> tags
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

        await msg.reply({ embeds: [embed] });
    }
}
