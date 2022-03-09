import { Message } from 'discord.js';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import { Hina } from '../../res/config.js';
import { QueryType, Queue } from 'discord-player';

export default class play implements BaseCommand {
    name: String;
    description: String;
    commandUsage: String;
    args: CommandArgument[];

    constructor() {
        this.name = 'play';
        this.description = 'add song to song queue.';
        this.commandUsage = '<yt_url/search_terms>';
        this.args = [
            new CommandArgument({ type: 'paragraph' })
                .setName('yt_url/search_terms')
                .setDescription('a YouTube video url or words to search on YouTube.'),
        ];
    }

    async execute(msg: Message, args: string[]) {
        const [query] = args;

        // return if author not in vc
        if (!msg.member!.voice.channel) return await msg.reply('Please join a voice channel!');

        let _: Queue<any> = Hina.player.getQueue(msg.guild!);
        const queue = _
            ? _
            : Hina.player.createQueue(msg.guild!, {
                  metadata: {
                      channel: msg.channel,
                  },
              });

        const resource = await Hina.player.search(query, {
            requestedBy: msg.member!,
            searchEngine: QueryType.AUTO,
        });
        if (!resource) return msg.reply('No results found with the query provided.');
        queue.addTracks(resource.tracks);

        if (msg.member!.voice.channelId !== msg.guild!.me!.voice.channelId) {
            try {
                await queue.connect(msg.member!.voice.channel);
            } catch {
                Hina.player.deleteQueue(msg.guild!);
                return await msg.reply('Cannot join your voice channel! Try checking my permissions on the server.');
            }

            if (!queue.playing) await queue.play();
        }

        // // search URL or keyword
        // let result = await queryYT(query);

        // await profile!.addSong(result.resource, result.videoInfo);
        // await msg.react(okEmoji);
    }
}
