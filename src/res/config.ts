import { Player, Queue } from 'discord-player';
import { Client, Collection, Intents, ImageURLOptions, MessageEmbed, EmbedAuthorData } from 'discord.js';
import 'dotenv/config';

export const token = process.env.TOKEN;
export const prefix = 'test ';
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
    const npMusic = queue.nowPlaying();
    const embed = new MessageEmbed()
        .setColor(hinaColor)
        .setAuthor({
            name: `Music queue for ${queue.guild.name}`,
            iconURL: queue.guild.iconURL() ? queue.guild.iconURL()! : Hina.user!.displayAvatarURL(),
        })
        .setTitle('Now Playing:')
        .setDescription(`[${npMusic.title}](${npMusic.url}) \`${npMusic.duration}\``)
        .addFields(
            { name: 'Source', value: npMusic.source },
            { name: 'Artist', value: npMusic.author },
            { name: 'Views', value: String(npMusic.views) },
            { name: 'Requested by', value: `<@${npMusic.requestedBy.id}>` }
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
        .setDescription(`Added ${track.length} song.`);
    await queue.metadata.channel.send({ embeds: [embed] });
});

// Hina.player.on('queueEnd', (queue, track) => {});
export { Hina };
