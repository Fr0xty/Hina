import { Client, CommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('join')
                .setDescription('I will join your voice channel.')
                .setDMPermission(false)
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const targetMember = interaction.member as GuildMember;

        /**
         * target member isn't in a voice channel
         */
        if (!targetMember.voice.channel) {
            return await interaction.reply('Please join a voice channel before using this command.');
        }

        /**
         * join
         */
        const queue = Hina.player.getQueue(interaction.guild!);
        if (!queue) {
            const queue = Hina.player.createQueue(interaction.guild!, {
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
            await queue.connect(targetMember.voice.channel);
        }
        if (targetMember.voice.channelId !== interaction.guild!.members.me!.voice.channelId) {
            await queue?.connect(targetMember.voice.channel);
        }

        await interaction.reply(Hina.okEmoji);
    }
}
