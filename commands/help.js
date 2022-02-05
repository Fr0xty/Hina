import { Help as HinaHelpEmbed } from '../res/models/HinaEmbeds.js';
import { generateClientInvite } from '../utils/general.js';
import { hinaColor, okEmoji } from '../res/config.js';


export const commands = [

    {
        name: 'help',
        aliases: [],
        description: 'get help on my commands!',
        async execute(client, msg, args) {

            const clientInvite = await generateClientInvite(client);

            const embed = new HinaHelpEmbed(client, msg.author, clientInvite);

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
            const sentEmbed = await msg.reply({
                embeds: [embed.mainPage],
                components: [
                    embed.components.actionRow,
                    embed.components.selectCategory,
                    embed.components.linkRow,
                ]
            });

            const collector = sentEmbed.createMessageComponentCollector({ idle: 600_000, dispose: true });
            collector.on('collect', async i => {

                let category;

                if (i.customId === 'select') {
                    switch(i.values[0]) {
                        case ('behavoiral'):
                            category = 'behavoiral';
                            embed.components.actionRow.components[0].setDisabled(false);
                            break;
                        
                        case ('general'):
                            category = 'general';
                            embed.components.actionRow.components[0].setDisabled(false);
                            break;
                        
                        case ('fun'):
                            category = 'fun';
                            embed.components.actionRow.components[0].setDisabled(false);
                            break;
                        
                        case ('emoji'):
                            category = 'emoji';
                            embed.components.actionRow.components[0].setDisabled(false);
                            break;
                        
                        case ('music'):
                            category = 'music';
                            embed.components.actionRow.components[0].setDisabled(false);
                            break;
                        
                        case ('image'):
                            category = 'image';
                            embed.components.actionRow.components[0].setDisabled(false);
                            break;
                        
                        case ('utility'):
                            category = 'utility';
                            embed.components.actionRow.components[0].setDisabled(false);
                            break;
                        
                        case ('coderunner'):
                            category = 'coderunner';
                            embed.components.actionRow.components[0].setDisabled(false);
                            break;
                    }
                }else {
                    switch (i.customId) {
                        case ('mainPage'):
                            category = 'mainPage';
                            embed.components.actionRow.components[0].setDisabled();
                            break;

                        case ('delete'):
                            await sentEmbed.delete();
                            await msg.react(okEmoji);
                            return;
                    };
                };

                await sentEmbed.edit({ 
                    embeds: [embed[category]],
                    components: [
                        embed.components.actionRow,
                        embed.components.selectCategory,
                        embed.components.linkRow,
                    ]
                });
                await i.deferUpdate();
            });
            collector.on('end', async collected => {
                try {
                    await sentEmbed.edit({ components: [] });
                    await msg.react(okEmoji);
                } catch {};
            });
        }
    },
];