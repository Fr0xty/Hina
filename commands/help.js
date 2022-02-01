const { hinaColor } = require('../res/config');
const { Help: HinaHelpEmbed } = require('../res/models/HinaEmbeds');


module.exports = [

    {
        name: 'help',
        aliases: [],
        description: 'get help on my commands!',
        async execute(client, msg, args) {

            const embed = new HinaHelpEmbed(client, msg.author);

            if (args.length != 0) {

                const cat = args[0].toLowerCase();
                if (!embed.categories.includes(cat)) {

                    await msg.reply(`
                    There is no category called: \`${cat}\`.\nUse \`hina help\` instead or to check the category.
                    `);
                    return;
                }
                else {
                    await msg.reply({ embeds: [embed[cat]] });
                    return;
                }
            }
            await msg.reply({ 
                embeds: [embed.mainPage],
                components: [
                    embed.components.actionRow,
                    embed.components.selectCategory,
                    embed.components.linkRow,
                ]
            });
        }
    }

];