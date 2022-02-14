import { MessageEmbed } from 'discord.js';
import { readFile } from 'fs/promises';

const packageJSON = JSON.parse(await readFile(new URL('../../package.json', import.meta.url)));
import { hinaColor, hinaImageOption } from '../../res/config.js';
import { convertSeconds } from '../../utils/convert.js';


export default {

    name: 'appinfo',
    aliases: [],
    description: 'get my information.',





    async execute(Hina, msg, args) {

        const djsVer = packageJSON.dependencies['discord.js'];
        const nodeVer = packageJSON.devDependencies['node'];
        const uptime = await convertSeconds(Hina.uptime / 1000);
        
        const embed = new MessageEmbed()
            .setDescription(`
discord.js: \`${djsVer}\`
Node JS: \`${nodeVer}\`

bot latency: \`${Date.now() - msg.createdTimestamp}ms\`
websocket latency: \`${Math.round(Hina.ws.ping)}ms\`
bot uptime: \`${uptime}\`
            `)
            .setAuthor({name: Hina.user.tag, iconURL: Hina.user.displayAvatarURL(hinaImageOption)})
            .setColor(hinaColor)
            .setTitle(`Hina's Application Info`)
            .setThumbnail(Hina.user.displayAvatarURL(hinaImageOption))
            .setTimestamp()
            .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)});
        await msg.reply({ embeds: [embed] });
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};