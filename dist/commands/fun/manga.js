import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';
import { loadFile } from 'graphql-import-files';
import CommandArgument from '../../res/models/CommandArgument.js';
import { Hina } from '../../res/config.js';
export default class manga {
    name;
    description;
    commandUsage;
    args;
    gqlSchema;
    constructor() {
        this.name = 'manga';
        this.description = 'search for information on manga.';
        this.commandUsage = '<manga_name>';
        this.args = [
            new CommandArgument({ type: 'paragraph' }).setName('manga_name').setDescription('manga to search for.'),
        ];
        this.gqlSchema = loadFile('./schema/anilistManga.gql');
    }
    async execute(msg, args) {
        const [manga_name] = args;
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
        if (req.status === 404)
            return await msg.reply(`Did not find any manga with the search terms: \`${manga_name}\`.`);
        if (req.status !== 200) {
            return await msg.reply('Something went wrong with the request. Please try again in a while.');
        }
        const { data: { Media: mangaInfo }, } = JSON.parse(JSON.stringify(await req.json()).replaceAll(':null,', ':"-",'));
        console.log(mangaInfo);
        const embed = new MessageEmbed()
            .setTitle(`${mangaInfo.title.native}\n${mangaInfo.title.english}`)
            .setURL(`https://myanimelist.net/manga/${mangaInfo.idMal}`)
            .setDescription(mangaInfo.description.replaceAll('<br><br>', '\n'))
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
