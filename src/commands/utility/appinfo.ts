import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import BaseCommand from '../../res/BaseCommand.js';
import { convertSeconds } from '../../utils/convert.js';
import { getUsernameOrTag } from '../../utils/user.js';

// @ts-ignore package.json is not in ./src therefore can't be imported (for code safety purpose but this is exception)
import packageJSON from '../../../package.json' assert { type: 'json' };

export default class extends BaseCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('appinfo').setDescription('get information about me.'));
    }

    async slashExecute(Hina: Client, interaction: CommandInteraction) {
        /**
         * get information
         */
        const guildIn = await Hina.guilds.fetch();
        const memberCount = Hina.users.cache.size;
        const djsVer = packageJSON.dependencies['discord.js'];
        const nodeVer = process.version;
        const uptime = await convertSeconds(Hina.uptime! / 1000);

        /**
         * format embed
         */
        const embed = new EmbedBuilder()
            .setDescription(
                `
Hina is in \`${guildIn.size}\` guilds!
Serving approximately \`${memberCount}\` total unique members.
discord.js: \`${djsVer}\`
Node JS: \`${nodeVer}\`
bot latency: \`${Math.abs(Date.now() - interaction.createdTimestamp)}ms\`
websocket latency: \`${Math.round(Hina.ws.ping)}ms\`
bot uptime: \`${uptime}\`
            `
            )
            .setAuthor({
                name: getUsernameOrTag(Hina.user!),
                iconURL: Hina.user!.displayAvatarURL(Hina.imageOption),
            })
            .setColor(Hina.color)
            .setTitle(`Hina's Application Info`)
            .setThumbnail(Hina.user!.displayAvatarURL(Hina.imageOption))
            .setTimestamp()
            .setFooter({
                text: `Requested by: ${getUsernameOrTag(interaction.user)}`,
                iconURL: interaction.user.displayAvatarURL(Hina.imageOption),
            });

        /**
         * send result
         */
        await interaction.reply({ embeds: [embed] });
    }
}
