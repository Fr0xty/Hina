import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import ImageChoices from '../../res/ImageChoices.js';
import { fetchImage } from '../../utils/imageCommand.js';
import { interactionPaginator } from '../../utils/paginator.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('image_nsfw')
                .setDescription('get some nsfw images.')
                .addIntegerOption((option) =>
                    option
                        .setName('type')
                        .setDescription('select type of image.')
                        .setChoices(
                            { name: 'Ass', value: ImageChoices.NSFW.Ass },
                            { name: 'Hentai', value: ImageChoices.NSFW.Hentai },
                            { name: 'Milf', value: ImageChoices.NSFW.Milf },
                            { name: 'Oral', value: ImageChoices.NSFW.Oral },
                            { name: 'Paizuri', value: ImageChoices.NSFW.Paizuri },
                            { name: 'Ecchi', value: ImageChoices.NSFW.Ecchi },
                            { name: 'Ero', value: ImageChoices.NSFW.Ero },
                            { name: 'Neko', value: ImageChoices.NSFW.Neko },
                            { name: 'Waifu', value: ImageChoices.NSFW.Waifu },
                            { name: 'Trap', value: ImageChoices.NSFW.Trap },
                            { name: 'Blowjob', value: ImageChoices.NSFW.Blowjob },
                            { name: 'Maid', value: ImageChoices.NSFW.Maid },
                            { name: 'Marin Kitagawa', value: ImageChoices.NSFW.MarinKitagawa },
                            { name: 'Mori Calliope', value: ImageChoices.NSFW.MoriCalliope },
                            { name: 'Raiden Shogun', value: ImageChoices.NSFW.RaidenShogun },
                            { name: 'Oppai', value: ImageChoices.NSFW.Oppai },
                            { name: 'Selfies', value: ImageChoices.NSFW.Selfies },
                            { name: 'Uniform', value: ImageChoices.NSFW.Uniform }
                        )
                        .setRequired(true)
                )
                .addNumberOption((option) =>
                    option
                        .setName('limit')
                        .setDescription('Increase amount of pictures you get. Maximum 30.')
                        .setMinValue(1)
                        .setMaxValue(30)
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            type: interaction.options.get('type')!.value as number,
            limit: interaction.options.get('limit')?.value as number | undefined,
        };

        const paginable = (await fetchImage(args.type, true, args.limit))!;
        await interactionPaginator(interaction, paginable, 120_000);
    }
}
