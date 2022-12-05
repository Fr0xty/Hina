import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/models/BaseCommand.js';
import { interactionPaginator } from '../../utils/paginator.js';

export default class extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('getemoji')
                .setDescription('get all of the server emoji ids.')
                .addStringOption((option) =>
                    option.setName('server_id').setDescription('server id of the emoji hosting server.')
                )
        );
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        const args = {
            server_id: interaction.options.get('server_id')?.value as string | undefined,
        };

        try {
            /**
             * fetch guild by id from api, not providing server id defaults to invoked command server
             */
            const guild =
                args.server_id === undefined ? interaction.guild! : await Hina.guilds.fetch(args.server_id.toString());

            /**
             * fetch server emojis
             */
            const guildEmoji = await guild.emojis.fetch();

            /**
             * immediately return if server has no emoji
             */
            if (!guildEmoji.size) return await interaction.reply("The server doesn't have any emoji!");

            /**
             * for displaying emoji count in result embed
             */
            const emojiAmount = guildEmoji.size;

            /**
             * make pages
             */
            const pageAmount = Math.ceil(emojiAmount / 20);
            let pages = [];
            let page = '';
            let _ = 0;

            for (const [id, emoji] of guildEmoji.entries()) {
                page += `${emoji}- \`${emoji}\`\n`;
                _++;

                if (_ === 20) {
                    const embed: EmbedBuilder = new EmbedBuilder()
                        .setColor(Hina.color)
                        .setAuthor({
                            name: `${Hina.user!.username} Page ${pages.length + 1} / ${pageAmount}`,
                            iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
                        })
                        .setTitle(`Emoji Id(s) for ${guild!.name} [${emojiAmount}]`)
                        .setDescription(page)
                        .setFooter({
                            text: `Requested by: ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
                        })
                        .setTimestamp();

                    pages.push(embed);
                    page = '';
                    _ = 0;
                }
            }
            if (_) {
                const embed = new EmbedBuilder()
                    .setColor(Hina.color)
                    .setAuthor({
                        name: `${Hina.user!.username} Page ${pages.length + 1} / ${pageAmount}`,
                        iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
                    })
                    .setTitle(`Emoji Id(s) for ${guild!.name} [${emojiAmount}]`)
                    .setDescription(page)
                    .setFooter({
                        text: `Requested by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
                    })
                    .setTimestamp();

                pages.push(embed);
            }

            /**
             * create pagination for user
             */
            await interactionPaginator(interaction, pages, 120_000);
        } catch {
            return await interaction.reply("Invalid server id / I'm not in that server.");
        }
    }
}
