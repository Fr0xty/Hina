import { Client, Message, EmbedBuilder } from 'discord.js';

import { BaseCommand } from 'hina';
import { convertSeconds } from '../../utils/convert.js';

// @ts-ignore package.json is not in ./src therefore can't be imported
import packageJSON from '../../../package.json' assert { type: 'json' };

export default class appinfo implements BaseCommand {
    name: String;
    description: String;

    constructor() {
        this.name = 'appinfo';
        this.description = 'get information about me.';
    }

    async execute(Hina: Client, msg: Message, args: string[]) {
        const guildIn = await Hina.guilds.fetch();
        const memberCount = Hina.users.cache.size;
        const djsVer = packageJSON.dependencies['discord.js'];
        const nodeVer = process.version;
        const uptime = await convertSeconds(Hina.uptime! / 1000);

        const embed = new EmbedBuilder()
            .setDescription(
                `
Hina is in \`${guildIn.size}\` guilds!
Serving approximately \`${memberCount}\` total unique members.
discord.js: \`${djsVer}\`
Node JS: \`${nodeVer}\`
bot latency: \`${Math.abs(Date.now() - msg.createdTimestamp)}ms\`
websocket latency: \`${Math.round(Hina.ws.ping)}ms\`
bot uptime: \`${uptime}\`
            `
            )
            .setAuthor({ name: Hina.user!.tag, iconURL: Hina.user!.displayAvatarURL(Hina.imageOption) })
            .setColor(Hina.color)
            .setTitle(`Hina's Application Info`)
            .setThumbnail(Hina.user!.displayAvatarURL(Hina.imageOption))
            .setTimestamp()
            .setFooter({
                text: `Requested by: ${msg.author.tag}`,
                iconURL: msg.author.displayAvatarURL(Hina.imageOption),
            });
        await msg.reply({ embeds: [embed] });
    }
}
