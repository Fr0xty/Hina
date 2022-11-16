import {
    CommandInteraction,
    Message,
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    ButtonStyle,
    APIActionRowComponent,
    APIMessageActionRowComponent,
} from 'discord.js';

import Hina from '../res/HinaClient.js';

const _aquaButtons = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('pageLeft').setEmoji('879530551038603264').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId('pageRight').setEmoji('879530551881637930').setStyle(ButtonStyle.Secondary)
);

export const paginator = async (msg: Message, pages: EmbedBuilder[], timeout: number) => {
    if (pages.length === 1) return await msg.channel.send({ embeds: [pages[0]] });

    let currentPage = 0;
    const sentMsg = await msg.channel.send({
        embeds: [pages[currentPage]],
        components: [_aquaButtons as any],
    });
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

export const interactionPaginator = async (interaction: CommandInteraction, pages: EmbedBuilder[], timeout: number) => {
    if (pages.length === 1) return await interaction.reply({ embeds: [pages[0]] });

    let currentPage = 0;
    const sentMsg = (await interaction.reply({
        embeds: [pages[currentPage]],
        components: [_aquaButtons as any],
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
