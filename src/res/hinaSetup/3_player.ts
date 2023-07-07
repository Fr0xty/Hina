import { Player, Queue } from 'discord-player';
import { EmbedBuilder } from 'discord.js';

import Hina from './2_properties.js';
import { getUsernameOrTag } from '../../utils/user.js';

/**
 * player for music commands
 */
Hina.player = new Player(Hina);

Hina.player
    .on('trackStart', (queue: Queue<any>, track) => {
        const embed = new EmbedBuilder()
            .setColor(Hina.color)
            .setAuthor({
                name: `Music queue for ${queue.guild.name}`,
                iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
            })
            .setThumbnail(track.thumbnail)
            .setTitle('Now Playing:')
            .setDescription(`[${track.title}](${track.url}) \`${track.duration}\``)
            .addFields(
                { name: 'Source', value: track.source },
                { name: 'Artist', value: track.author },
                { name: 'Views', value: String(track.views) },
                { name: 'Requested by', value: `<@${track.requestedBy.id}>` }
            );
        queue.metadata.channel.send({ embeds: [embed] });
    })

    .on('error', (queue, error) => {
        console.log(error);
    })

    .on('connectionError', (queue, error) => {
        console.log(error);
    })

    .on('trackAdd', async (queue: Queue<any>, track) => {
        const embed = new EmbedBuilder()
            .setColor(Hina.color)
            .setAuthor({
                name: `Music queue for ${queue.guild.name}`,
                iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
            })
            .setThumbnail(track.thumbnail)
            .setTitle('Added to queue:')
            .setDescription(`[${track.title}](${track.url})`)
            .setFooter({
                text: `Added by ${getUsernameOrTag(track.requestedBy)}`,
                iconURL: track.requestedBy.displayAvatarURL(),
            });
        await queue.metadata.channel.send({ embeds: [embed] });
    })

    .on('tracksAdd', async (queue: Queue<any>, track) => {
        const embed = new EmbedBuilder()
            .setColor(Hina.color)
            .setAuthor({
                name: `Music queue for ${queue.guild.name}`,
                iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
            })
            .setThumbnail(track[0].thumbnail)
            .setDescription(`Added ${track.length} song.`);
        await queue.metadata.channel.send({ embeds: [embed] });
    })

    .on('queueEnd', async (queue: Queue<any>) => {
        await queue.metadata.channel.send('There is no more music in queue, use `play` to add more songs.');
    });

export default Hina;
