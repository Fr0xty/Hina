import 'dotenv/config';
import firebaseAdmin from 'firebase-admin';
import { Player, Queue } from 'discord-player';
import { Client, Collection, Intents, MessageEmbed } from 'discord.js';

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
 * properties
 */
Hina.token = process.env.TOKEN!;
Hina.prefix = 'hina ';
Hina.color = '#E49CFF';

Hina.okEmoji = '902096184645124146';
Hina.imageOption = { dynamic: true, size: 4096 };

/**
 * to store all commands
 */
Hina.commands = new Collection();

/************************************************
 * player instance for music commands
 ***********************************************/
Hina.player = new Player(Hina);

Hina.player.on('trackStart', (queue: Queue<any>, track) => {
    const embed = new MessageEmbed()
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
});

Hina.player.on('error', (queue, error) => {
    console.log(error);
});

Hina.player.on('connectionError', (queue, error) => {
    console.log(error);
});

Hina.player.on('trackAdd', async (queue: Queue<any>, track) => {
    const embed = new MessageEmbed()
        .setColor(Hina.color)
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
        .setColor(Hina.color)
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

/************************************************
 * connect to firebase
 ***********************************************/
const app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS!)),
    databaseURL: 'https://hina-9a90d-default-rtdb.firebaseio.com/',
});

Hina.database = firebaseAdmin.firestore(app);

export default Hina;
