import { hinaImageOption } from '../../res/config.js';
import { convertSeconds } from '../../utils/convert.js';


export default {

    name: 'spotify',
    aliases: [],
    description: 'get user spotify listening info.',





    async execute(Hina, msg, args) {
        
        let member;
        const activities = msg.member.presence.activities;

        // get member, return if no member is found
        if (args.length === 0) { member = msg.member }
        else {
            try {
                member = await msg.guild.members.fetch({user: args[0].match(/[0-9]+/)[0], withPresences: true});
            } catch (e) {
                return await msg.reply('Invalid member! Either the user isn\'t in the server or invalid id / mention.');
            };
            };

        if (activities || activities >= 1) {
            
            let spotifyAct = activities.filter(act => act.name === 'Spotify' && act.type === 'LISTENING');
            if (spotifyAct.length === 0) {
                await msg.reply(`${member} is not listening to Spotify!`);
                return;
            };
            spotifyAct = spotifyAct.shift();

            const songName = spotifyAct.details;
            const songUrl = `https://open.spotify.com/track/${spotifyAct.syncId}`;
            const albumArt = spotifyAct.assets.largeImageURL();
            const artists = spotifyAct.state.replace(';', ',');
            const albumName = spotifyAct.assets.largeText;
            const startTime = Math.round(Math.abs(spotifyAct.timestamps.start / 1000));
            const endTime = Math.round(Math.abs(spotifyAct.timestamps.end / 1000));
            const songDuration = await convertSeconds(Math.abs(endTime - startTime));
            const partyID = spotifyAct.party.id;

            const embed = new MessageEmbed()
                .setAuthor({name: `${member.user.tag}'s Spotify Activity`, iconURL: 'https://cdn.discordapp.com/emojis/936844383926517771.webp?size=96&quality=lossless'})
                .setColor('#1DB954')
                .setTitle(songName)
                .setURL(songUrl)
                .setThumbnail(albumArt)
                .setTimestamp()
                .setFooter({text: `Requested by: ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL(hinaImageOption)})
                .setDescription(`
artist(s):
\`${artists}\`

album:
\`${albumName}\`

song started:
<t:${startTime}:t> | <t:${startTime}:R>

ending song:
<t:${endTime}:t> | <t:${endTime}:R>

song duration: \`${songDuration}\`

party id: \`${partyID}\`
                `);
                
            
            await msg.reply({ embeds: [embed] });
            return;
        }
        await msg.reply(`${member} is not listening to Spotify!`);    
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};