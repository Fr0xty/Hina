import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import { QueueRepeatMode } from 'discord-player';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('loop')
                .setDescription('set song loop setting for the song queue in the server.')
                .addIntegerOption((option) =>
                    option
                        .setName('type')
                        .setDescription('type of looping.')
                        .setChoices(
                            { name: 'Cancel', value: QueueRepeatMode.OFF },
                            { name: 'Song', value: QueueRepeatMode.TRACK },
                            { name: 'Queue', value: QueueRepeatMode.QUEUE }
                        )
                        .setRequired(true)
                )
                .setDMPermission(false)
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            type: interaction.options.get('type')!.value as number,
        };

        /**
         * get server song queue
         */
        const queue = Hina.player.getQueue(interaction.guild!);

        /**
         * not playing any song in server
         */
        if (!queue) return await interaction.reply("I'm not currently playing songs in this server.");

        /**
         * set looping type
         */
        queue.setRepeatMode(args.type);
        await interaction.reply(Hina.okEmoji);
    }
}
