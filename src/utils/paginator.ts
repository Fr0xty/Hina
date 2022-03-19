import { CommandInteraction, Message, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';

import { Hina } from '../res/config.js';

const _aquaButtons = new MessageActionRow().addComponents(
    new MessageButton().setCustomId('pageLeft').setEmoji('879530551038603264').setStyle('SECONDARY'),
    new MessageButton().setCustomId('pageRight').setEmoji('879530551881637930').setStyle('SECONDARY')
);

export const paginator = async (msg: Message, pages: MessageEmbed[], timeout: number) => {
    if (pages.length === 1) return await msg.channel.send({ embeds: [pages[0]] });

    let currentPage = 0;
    const sentMsg = await msg.channel.send({ embeds: [pages[currentPage]], components: [_aquaButtons] });
    const collector = sentMsg.createMessageComponentCollector({ idle: timeout, dispose: true });
    collector.on('collect', async (i) => {
        if (i.customId === 'pageLeft' && currentPage !== 0) currentPage--;
        else if (i.customId === 'pageRight' && currentPage !== pages.length - 1) currentPage++;
        else if (i.customId === 'pageLeft' && currentPage === 0) currentPage = pages.length - 1;
        else if (i.customId === 'pageRight' && currentPage === pages.length - 1) currentPage = 0;

        await sentMsg.edit({ embeds: [pages[currentPage]] });
        await i.deferUpdate();
    });
    collector.on('end', async (collected) => {
        try {
            await msg.react(Hina.okEmoji);
            await sentMsg.edit({ components: [] });
        } catch {}
    });
};

export const interactionPaginator = async (interaction: CommandInteraction, pages: MessageEmbed[], timeout: number) => {
    if (pages.length === 1) return await interaction.reply({ embeds: [pages[0]] });

    let currentPage = 0;
    const sentMsg = (await interaction.reply({
        embeds: [pages[currentPage]],
        components: [_aquaButtons],
        fetchReply: true,
    })) as Message;

    const collector = sentMsg.createMessageComponentCollector({ idle: timeout, dispose: true });
    collector.on('collect', async (i) => {
        if (i.customId === 'pageLeft' && currentPage !== 0) currentPage--;
        else if (i.customId === 'pageRight' && currentPage !== pages.length - 1) currentPage++;
        else if (i.customId === 'pageLeft' && currentPage === 0) currentPage = pages.length - 1;
        else if (i.customId === 'pageRight' && currentPage === pages.length - 1) currentPage = 0;

        await sentMsg.edit({ embeds: [pages[currentPage]] });
        await i.deferUpdate();
    });
    collector.on('end', async (collected) => {
        try {
            await sentMsg.edit({ components: [] });
        } catch {}
    });
};
