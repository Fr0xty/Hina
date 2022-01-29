const { hinaColor } = require('../res/config');
const { Help: HinaHelpEmbed } = require('../res/hinaEmbeds');


module.exports = [

    {
        name: 'help',
        description: 'get help on my commands!',
        async execute(client, msg, args) {

            const embed = new HinaHelpEmbed(client, msg.author);

            if (args.length != 0) {

                const cat = args[0].toLowerCase();
                if (!embed.categories.includes(cat)) {

                    await msg.channel.send(`
                    There is no category called: \`${cat}\`.\nUse \`hina help\` instead or to check the category.
                    `);
                    return;
                }
                else {
                    await msg.channel.send({ embeds: [embed[cat]] });
                    return;
                }
            }
            await msg.channel.send({ 
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