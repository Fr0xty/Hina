import { QueryType } from 'discord-player';
import { Client, CommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('play')
                .setDescription('add song to the song queue.')
                .addStringOption((option) =>
                    option.setName('url_or_search').setDescription('A song url or search term.').setRequired(true)
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            url_or_search: interaction.options.get('url_or_search')!.value as string,
        };

        const targetMember = interaction.member as GuildMember;

        /**
         * member is not in voice channel
         */
        if (!targetMember.voice.channel) return await interaction.reply('Please join a voice channel!');

        /**
         * get already existing queue else create new queue and store into queue constant
         */
        const alreadyConnectedQueue = Hina.player.getQueue(interaction.guild!);
        const queue =
            alreadyConnectedQueue ??
            Hina.player.createQueue(interaction.guild!, {
                ytdlOptions: {
                    quality: 'highest',
                    filter: 'audioonly',
                    highWaterMark: 1 << 25,
                    dlChunkSize: 0,
                },
                metadata: {
                    channel: interaction.channel,
                },
                leaveOnEnd: false,
                leaveOnStop: false,
                leaveOnEmptyCooldown: 180000,
                initialVolume: 50,
            });

        /**
         * search with url_or_search argument
         */
        const resource = await Hina.player.search(args.url_or_search, {
            requestedBy: targetMember,
            searchEngine: QueryType.AUTO,
        });

        /**
         * no result
         */
        if (!resource.tracks.length) return interaction.reply('No results found with the query provided.');

        /**
         * if argument is a playlist url: add all songs, else add first result
         */
        if (args.url_or_search.includes('https://') && resource.tracks.length > 1) {
            queue.addTracks(resource.tracks);
        } else {
            queue.addTrack(resource.tracks[0]);
        }

        /**
         * if bot is not in the same vc / not in any vc, join the member's channel
         */
        if (targetMember.voice.channelId !== interaction.guild!.members.me!.voice.channelId || !alreadyConnectedQueue) {
            try {
                await queue.connect(targetMember.voice.channel);
            } catch {
                Hina.player.deleteQueue(interaction.guild!);
                return await interaction.reply(
                    'Cannot join your voice channel! Try checking my permissions on the server.'
                );
            }
        }

        /**
         * start playing from queue
         */
        if (!queue.playing) await queue.play();

        /**
         * reply to avoid "The application did not respond" error message
         */
        await interaction.reply(Hina.okEmoji);
    }
}
