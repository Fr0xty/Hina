export const convertSeconds = async (seconds) => {

    seconds = Math.round(seconds);
    if (seconds <= 59) return `${seconds}s`;

    seconds = seconds % (24 * 3600);
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;

    if (hours) {
        return `${hours}h ${minutes}m ${seconds}s`;
    } 
    else {
        return `${minutes}m ${seconds}s`;
    };
};



export const convertMention = async (Hina, mention) => {
        
    if (!mention) return 'no mentions provided';

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        };
        return Hina.users.cache.get(mention);
    };
};



export const convertPresence = async (presence) => {

    const platform = ['desktop', 'mobile', 'web'];
    let result = '';

    platform.forEach((pf) => {
        if ( !presence.hasOwnProperty(pf) ) {result += `${pf}: <:status_offline:908249115505332234>\n`}
        else {
            switch (presence[pf]) {
                case ('online'):
                    result += `${pf}: <:status_online:908249121322852352>\n`
                    break;
                case ('idle'):
                    result += `${pf}: <:status_idle:908249625218134026>\n`
                    break;
                case ('dnd'):
                    result += `${pf}: <:status_donotdisturb:908249416060780574>\n`
                    break;
            }
        }
    })
    return result;
};



export const convertFlags = async (bitField) => {

    let flags = [];
    if (bitField == 0) return 'None';

    if (bitField & (0b1 << 0)) flags.push('<:discord_staff:908516650331025458>');
    if (bitField & (0b1 << 1)) flags.push('<:discord_partner:908517486113202287>');
    if (bitField & (0b1 << 2)) flags.push('<:hypeSquad_event:908246675108266024>');
    if (bitField & (0b1 << 3)) flags.push('<:bug_hunter:908516650133897287>');
    if (bitField & (0b1 << 6)) flags.push('<:Hypesquad_bravery:908246674818871306>');
    if (bitField & (0b1 << 7)) flags.push('<:hypesquad_brilliance:908246675116670986>');
    if (bitField & (0b1 << 8)) flags.push('<:hypesquad_balance:908246674755964978>');
    if (bitField & (0b1 << 9)) flags.push('<:early_supporter:908246674743365632>');
    if (bitField & (0b1 << 10)) flags.push('TEAM_PSEUDO_USER'); // TEAM_PSEUDO_USER
    if (bitField & (0b1 << 14)) flags.push('<:bug_buster:908516650326843412>');
    if (bitField & (0b1 << 16)) flags.push('<:verified_bot:936164801674100746>');
    if (bitField & (0b1 << 17)) flags.push('<:verified_developer:908246675267657759>');
    if (bitField & (0b1 << 18)) flags.push('<:discord_certified_moderator:908246674516885544>');
    if (bitField & (0b1 << 19)) flags.push('BOT_HTTP_INTERACTIONS');
    return flags.join(' ');
};



export const convertPermissions = async (bitField) => {

    bitField = Number(bitField);
    let perms = [];
    if (bitField == 0) return 'None';

    if (bitField & (0x1 << 0)) perms.push('create_instant_invite');
    if (bitField & (0x1 << 1)) perms.push('kick_members');
    if (bitField & (0x1 << 2)) perms.push('ban_members');
    if (bitField & (0x1 << 3)) perms.push('administrator');
    if (bitField & (0x1 << 4)) perms.push('manage_channels');
    if (bitField & (0x1 << 5)) perms.push('manage_guild');
    if (bitField & (0x1 << 6)) perms.push('add_reactions');
    if (bitField & (0x1 << 7)) perms.push('view_audit_log');
    if (bitField & (0x1 << 8)) perms.push('priority_speaker');
    if (bitField & (0x1 << 9)) perms.push('stream');
    if (bitField & (0x1 << 10)) perms.push('view_channel');
    if (bitField & (0x1 << 11)) perms.push('send_messages');
    if (bitField & (0x1 << 12)) perms.push('send_tts_messages');
    if (bitField & (0x1 << 13)) perms.push('manage_messages');
    if (bitField & (0x1 << 14)) perms.push('embed_links');
    if (bitField & (0x1 << 15)) perms.push('attach_files');
    if (bitField & (0x1 << 16)) perms.push('read_message_history');
    if (bitField & (0x1 << 17)) perms.push('mention_everyone');
    if (bitField & (0x1 << 18)) perms.push('use_external_emojis');
    if (bitField & (0x1 << 19)) perms.push('view_guild_insights');
    if (bitField & (0x1 << 20)) perms.push('connect');
    if (bitField & (0x1 << 21)) perms.push('speak');
    if (bitField & (0x1 << 22)) perms.push('mute_members');
    if (bitField & (0x1 << 23)) perms.push('deafen_members');
    if (bitField & (0x1 << 24)) perms.push('move_members');
    if (bitField & (0x1 << 25)) perms.push('use_vad');
    if (bitField & (0x1 << 26)) perms.push('change_nickname');
    if (bitField & (0x1 << 27)) perms.push('manage_nicknames');
    if (bitField & (0x1 << 28)) perms.push('manage_roles');
    if (bitField & (0x1 << 29)) perms.push('manage_webhooks');
    if (bitField & (0x1 << 30)) perms.push('manage_emojis_and_stickers');
    if (bitField & (0x1 << 31)) perms.push('use_application_commands');
    if (bitField & (0x1 << 32)) perms.push('request_to_speak');
    if (bitField & (0x1 << 33)) perms.push('manage_events');
    if (bitField & (0x1 << 34)) perms.push('manage_threads');
    if (bitField & (0x1 << 35)) perms.push('create_public_threads');
    if (bitField & (0x1 << 36)) perms.push('create_private_threads');
    if (bitField & (0x1 << 37)) perms.push('use_external_stickers');
    if (bitField & (0x1 << 38)) perms.push('send_messages_in_threads');
    if (bitField & (0x1 << 39)) perms.push('start_embedded_activities');
    if (bitField & (0x1 << 40)) perms.push('moderate_members');

    return {
        perms: perms.join(', '),
        length: perms.length
    };
};