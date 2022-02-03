const { MessageActionRow, MessageButton } = require('discord.js');

const { okEmoji } = require('../res/config');


const _aquaButtons = new MessageActionRow()
    .addComponents(

        new MessageButton()
            .setCustomId('pageLeft')
            .setEmoji('879530551038603264')
            .setStyle('SECONDARY'),

        new MessageButton()
            .setCustomId('pageRight')
            .setEmoji('879530551881637930')
            .setStyle('SECONDARY'),
    );


module.exports = {

    paginator: async (msg, pages, timeout) => {

        if (pages.length === 1) return await msg.channel.send({ embeds: [pages[0]] });

        let currentPage = 0;
        const sentMsg = await msg.channel.send({ embeds: [pages[currentPage]], components: [_aquaButtons]  });
        const collector = sentMsg.createMessageComponentCollector({ idle: timeout });
        collector.on('collect', async i => {

            if (i.customId === 'pageLeft' && currentPage !== 0) currentPage--
            else if (i.customId === 'pageRight' && currentPage !== pages.length - 1) currentPage++

            else if (i.customId === 'pageLeft' && currentPage === 0) currentPage = pages.length - 1
            else if (i.customId === 'pageRight' && currentPage === pages.length - 1) currentPage = 0;

            await sentMsg.edit({ embeds: [pages[currentPage]] });
            await i.deferUpdate();
        });
        collector.on('end', async collected => {
            await sentMsg.edit({ components: [] });
            await msg.react(okEmoji);
        });
    },
};