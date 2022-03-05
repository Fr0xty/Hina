import { Message, NewsChannel, StageChannel, TextChannel } from 'discord.js';

import { BaseCommand } from 'hina';
import CommandArgument from '../../res/models/CommandArgument.js';
import GuildMusic from '../../res/models/GuildMusic.js';
import { Hina, okEmoji } from '../../res/config.js';
import { joinVoiceChannel } from '@discordjs/voice';
import { queryYT } from '../../utils/music.js';

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
        await msg.reply('Sorry, music commands are currently down. They will be back in the next version. (v2.2.0)');
        // const [query] = args;
        // let profile = Hina.musicGuildProfile.get(msg.guildId!);

        // // return if author not in vc
        // if (!msg.member!.voice.channel) return await msg.reply('Please join a voice channel!');
        // if (!(msg.channel instanceof TextChannel || msg.channel instanceof NewsChannel)) return;

        // // join vc if not in the same vc
        // if (msg.member!.voice.channelId !== msg.guild!.me!.voice.channelId) {
        //     const connection = joinVoiceChannel({
        //         channelId: msg.member!.voice.channelId!,
        //         guildId: msg.guildId!,
        //         adapterCreator: msg.guild!.voiceAdapterCreator,
        //     });
        //     if (profile) {
        //         await profile.updateChannels(null, msg.channel);
        //         console.log('channels updated');
        //     }
        // }
        // // first time ? register guildProfile
        // if (!profile) {
        //     Hina.musicGuildProfile.set(msg.guildId!, new GuildMusic(msg.member!.voice.channel, msg.channel));
        //     profile = Hina.musicGuildProfile.get(msg.guildId!);
        // }

        // // search URL or keyword
        // let result = await queryYT(query);

        // await profile!.addSong(result.resource, result.videoInfo);
        // await msg.react(okEmoji);
    }
}
