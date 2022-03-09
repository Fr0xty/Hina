import { Player, Queue } from 'discord-player';
import { Client, Collection, Intents, ImageURLOptions, MessageEmbed, EmbedAuthorData } from 'discord.js';
import 'dotenv/config';
import { sleep } from '../utils/general';

export const token = process.env.TOKEN;
export const prefix = 'hina ';
export const hinaColor = '#E49CFF';

export const okEmoji = '902096184645124146';
export const hinaImageOption: ImageURLOptions = { dynamic: true, size: 4096 };

/************************************************
 * main Hina client
 ***********************************************/
const Hina = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
/**
 * to store all commands
 */
Hina.commands = new Collection();

/**
 * player instance for music commands
 */
Hina.player = new Player(Hina);

Hina.player.on('trackStart', (queue: Queue<any>, track) => {
    const embed = new MessageEmbed()
        .setColor(hinaColor)
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
});

Hina.player.on('error', (queue, error) => {
    console.log(error);
});

Hina.player.on('connectionError', (queue, error) => {
    console.log(error);
});

Hina.player.on('trackAdd', async (queue: Queue<any>, track) => {
    const embed = new MessageEmbed()
        .setColor(hinaColor)
        .setAuthor({
            name: `Music queue for ${queue.guild.name}`,
            iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
        })
        .setThumbnail(track.thumbnail)
        .setTitle('Added to queue:')
        .setDescription(`[${track.title}](${track.url})`)
        .setFooter({ text: `Added by ${track.requestedBy.tag}`, iconURL: track.requestedBy.displayAvatarURL() });
    await queue.metadata.channel.send({ embeds: [embed] });
});

Hina.player.on('tracksAdd', async (queue: Queue<any>, track) => {
    const embed = new MessageEmbed()
        .setColor(hinaColor)
        .setAuthor({
            name: `Music queue for ${queue.guild.name}`,
            iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
        })
        .setThumbnail(track[0].thumbnail)
        .setDescription(`Added ${track.length} song.`);
    await queue.metadata.channel.send({ embeds: [embed] });
});

Hina.player.on('queueEnd', async (queue: Queue<any>) => {
    await queue.metadata.channel.send('There is no more music in queue, use `play` to add more songs.');
});

export { Hina };
