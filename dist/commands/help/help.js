import CommandArgument from '../../res/models/CommandArgument.js';
import { Hina } from '../../res/config.js';
import { generateHinaInvite } from '../../utils/general.js';
import { Help as HinaHelpEmbed } from '../../res/models/HinaHelpEmbed.js';
export default class help {
    name;
    description;
    commandUsage;
    args;
    constructor() {
        this.name = 'help';
        this.description = 'get help on my commands.';
        this.commandUsage = '[command_category]';
        this.args = [
            new CommandArgument({ optional: true })
                .setName('command_category')
                .setDescription('command category to get help on.'),
        ];
    }
    async execute(msg, args) {
        let [command_category] = args;
        if (command_category)
            command_category = command_category.toLowerCase();
        const HinaInvite = await generateHinaInvite(Hina);
        const embed = new HinaHelpEmbed(msg.author, HinaInvite);
        if (command_category) {
            if (embed.categories.includes(command_category))
                return await msg.reply({ embeds: [embed[command_category]] });
            return await msg.reply(`
There is no category called: \`${command_category}\`.
Use \`hina help\` instead or to check the categories.
            `);
        }
        const sentEmbed = await msg.reply({
            embeds: [embed.mainPage],
            components: [embed.components.actionRow, embed.components.selectCategory, embed.components.linkRow],
        });
        const collector = sentEmbed.createMessageComponentCollector({ idle: 600_000, dispose: true });
        collector.on('collect', async (i) => {
            let category;
            if (i.customId === 'select') {
                switch (i.values[0]) {
                    case 'behavoiral':
                        category = 'behavoiral';
                        embed.components.actionRow.components[0].setDisabled(false);
                        break;
                    case 'general':
                        category = 'general';
                        embed.components.actionRow.components[0].setDisabled(false);
                        break;
                    case 'fun':
                        category = 'fun';
                        embed.components.actionRow.components[0].setDisabled(false);
                        break;
                    case 'emoji':
                        category = 'emoji';
                        embed.components.actionRow.components[0].setDisabled(false);
                        break;
                    case 'music':
                        category = 'music';
                        embed.components.actionRow.components[0].setDisabled(false);
                        break;
                    case 'image':
                        category = 'image';
                        embed.components.actionRow.components[0].setDisabled(false);
                        break;
                    case 'language':
                        category = 'language';
                        embed.components.actionRow.components[0].setDisabled(false);
                        break;
                    case 'utility':
                        category = 'utility';
                        embed.components.actionRow.components[0].setDisabled(false);
                        break;
                    case 'coderunner':
                        category = 'coderunner';
                        embed.components.actionRow.components[0].setDisabled(false);
                        break;
                }
            }
            else {
                switch (i.customId) {
                    case 'mainPage':
                        category = 'mainPage';
                        embed.components.actionRow.components[0].setDisabled();
                        break;
                    case 'delete':
                        await sentEmbed.delete();
                        await msg.react(Hina.okEmoji);
                        return;
                }
            }
            await sentEmbed.edit({
                embeds: [embed[category]],
                components: [embed.components.actionRow, embed.components.selectCategory, embed.components.linkRow],
            });
            await i.deferUpdate();
        });
        collector.on('end', async (collected) => {
            try {
                await sentEmbed.edit({ components: [] });
                await msg.react(Hina.okEmoji);
            }
            catch { }
        });
    }
}
