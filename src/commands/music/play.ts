import { QueryType, Queue } from 'discord-player';
import { Client, Message } from 'discord.js';

import CommandArgument from '../../res/models/CommandArgument.js';
import { BaseCommand } from 'hina';

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

    async execute(Hina: Client, msg: Message, args: string[]) {
        const [query] = args;

        // return if author not in vc
        if (!msg.member!.voice.channel) return await msg.reply('Please join a voice channel!');

        const alreadyConnectedQueue: Queue<any> = Hina.player.getQueue(msg.guild!);
        const queue = alreadyConnectedQueue
            ? alreadyConnectedQueue
            : Hina.player.createQueue(msg.guild!, {
                  ytdlOptions: {
                      quality: 'highest',
                      filter: 'audioonly',
                      highWaterMark: 1 << 25,
                      dlChunkSize: 0,
                  },
                  metadata: {
                      channel: msg.channel,
                  },
                  leaveOnEnd: false,
                  leaveOnStop: false,
                  leaveOnEmptyCooldown: 180000,
                  initialVolume: 50,
              });

        const resource = await Hina.player.search(query, {
            requestedBy: msg.member!,
            searchEngine: QueryType.AUTO,
        });
        if (!resource.tracks.length) return msg.reply('No results found with the query provided.');
        if (query.includes('https://') && resource.tracks.length > 1) {
            queue.addTracks(resource.tracks);
        } else {
            queue.addTrack(resource.tracks[0]);
        }

        if (msg.member!.voice.channelId !== msg.guild!.me!.voice.channelId || !alreadyConnectedQueue) {
            try {
                await queue.connect(msg.member!.voice.channel);
            } catch {
                Hina.player.deleteQueue(msg.guild!);
                return await msg.reply('Cannot join your voice channel! Try checking my permissions on the server.');
            }
        }
        if (!queue.playing) await queue.play();
    }
}
