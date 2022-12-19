import { Client, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';
import ImageChoices from '../../res/ImageChoices.js';
import { fetchImage } from '../../utils/imageCommand.js';
import { interactionPaginator } from '../../utils/paginator.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('image_sfw')
                .setDescription('get some nice images.')
                .addIntegerOption((option) =>
                    option
                        .setName('type')
                        .setDescription('select type of image.')
                        .setChoices(
                            { name: 'Waifu', value: ImageChoices.SFW.Waifu },
                            { name: 'Maid', value: ImageChoices.SFW.Maid },
                            { name: 'Marin Kitagawa', value: ImageChoices.SFW.MarinKitagawa },
                            { name: 'Mori Calliope', value: ImageChoices.SFW.MoriCalliope },
                            { name: 'Raiden Shogun', value: ImageChoices.SFW.RaidenShogun },
                            { name: 'Oppai', value: ImageChoices.SFW.Oppai },
                            { name: 'Selfies', value: ImageChoices.SFW.Selfies },
                            { name: 'Uniform', value: ImageChoices.SFW.Uniform },
                            { name: 'Neko', value: ImageChoices.SFW.Neko },
                            { name: 'Shinobu', value: ImageChoices.SFW.Shinobu },
                            { name: 'Megumin', value: ImageChoices.SFW.Megumin }
                        )
                        .setRequired(true)
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            type: interaction.options.get('type')!.value as number,
        };
        console.log(args.type);

        const paginable = (await fetchImage(args.type))!;
        await interactionPaginator(interaction, paginable, 120_000);
    }
}
