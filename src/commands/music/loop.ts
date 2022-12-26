import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

enum LoopChoices {
    Cancel,
    Song,
    Queue,
}

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
                            { name: 'Cancel', value: LoopChoices.Cancel },
                            { name: 'Song', value: LoopChoices.Song },
                            { name: 'Queue', value: LoopChoices.Queue }
                        )
                        .setRequired(true)
                )
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
