import { Client, Message, MessageEmbed } from 'discord.js';

import { BaseCommand } from 'hina';
import { paginator } from '../../utils/paginator.js';

export default class queue implements BaseCommand {
    name: String;
    description: String;
    aliases: String[];

    constructor() {
        this.name = 'queue';
        this.description = 'clear server song queue.';
        this.aliases = ['q'];
    }

    async execute(Hina: Client, msg: Message, args: string[]) {
        const queue = Hina.player.getQueue(msg.guild!);
        if (!queue) return await msg.reply("I'm not currently playing in this server.");

        const npMusic = queue.nowPlaying();
        if (!npMusic) return await msg.reply('There is no more music in queue, use `play` to add more songs.');

        /**
         * current loop option applied
         */
        let _;
        switch (queue.repeatMode) {
            case 0:
                _ = 'No loop applied 🔄';
                break;
            case 1:
                _ = 'Song loop applied 🔄';
                break;
            case 2:
                _ = 'Queue loop applied 🔄';
                break;
        }
        const loopMsg = _;

        /**
         * only 1 song in queue
         */
        if (!queue.tracks.length) {
            const embed = new MessageEmbed()
                .setColor(Hina.color)
                .setAuthor({
                    name: `Music queue for ${queue.guild.name}`,
                    iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
                })
                .setTitle('Now Playing:')
                .setDescription(
                    `
[${queue.nowPlaying().title}](${queue.nowPlaying().url}) - \`${queue.nowPlaying().duration}\`

no more songs in queue...
                `
                )
                .setFooter({
                    text: `${loopMsg}\nRequested by ${msg.author.tag}`,
                    iconURL: msg.author.displayAvatarURL(),
                })
                .setTimestamp();
            return await msg.reply({ embeds: [embed] });
        }

        /**
         * paginator
         */
        let songNum = 2;
        let page = `[${queue.nowPlaying().title}](${queue.nowPlaying().url})\n\n`;
        const pages: MessageEmbed[] = [];
        queue.tracks.forEach((track) => {
            page += `**${songNum++}.** [${track.title}](${track.url})\n`;

            if (songNum % 15 === 0) {
                const embed = new MessageEmbed()
                    .setColor(Hina.color)
                    .setAuthor({
                        name: `Music queue for ${queue.guild.name} | Page ${pages.length + 1} / ${Math.ceil(
                            (queue.tracks.length + 1) / 15
                        )}`,
                        iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
                    })
                    .setDescription(page)
                    .setTimestamp()
                    .setFooter({
                        text: `${loopMsg}\nRequested by ${msg.author.tag}`,
                        iconURL: msg.author.displayAvatarURL(),
                    });
                if (!pages.length) embed.setTitle('Now Playing:');

                pages.push(embed);
                page = '';
            }
        });
        if (page) {
            const embed = new MessageEmbed()
                .setColor(Hina.color)
                .setAuthor({
                    name: `Music queue for ${queue.guild.name} | Page ${pages.length + 1} / ${Math.ceil(
                        (queue.tracks.length + 1) / 15
                    )}`,
                    iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
                })
                .setDescription(page)
                .setTimestamp()
                .setFooter({
                    text: `${loopMsg}\nRequested by ${msg.author.tag}`,
                    iconURL: msg.author.displayAvatarURL(),
                });
            if (!pages.length) embed.setTitle('Now Playing:');

            pages.push(embed);
        }
        await paginator(msg, pages, 120_000);
    }
}
