import {
    Client,
    CommandInteraction,
    DMChannel,
    PartialDMChannel,
    PermissionFlagsBits,
    SlashCommandBuilder,
    TextBasedChannel,
} from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('prune')
                .setDescription('bulk delete a certain amount of messages in the channel.')
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
                .addIntegerOption((option) =>
                    option
                        .setName('amount')
                        .setDescription('Amount of message to delete.')
                        .setMinValue(1)
                        .setMaxValue(100)
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            amount: (interaction.options.get('amount')?.value ?? 1) as number,
        };

        /**
         * delete messages
         */
        try {
            await (interaction.channel as Exclude<TextBasedChannel, DMChannel | PartialDMChannel>).bulkDelete(
                args.amount
            );
        } catch (err) {
            return await interaction.reply({ content: (err as Error).message, ephemeral: true });
        }

        /**
         * simple reply
         */
        await interaction.reply({ content: `Successfully deleted ${args.amount} message(s).`, ephemeral: true });
    }
}
