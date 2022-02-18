import Translate from 'translate';
import DetectLanguage from 'detectlanguage';

const detectClient = new DetectLanguage(process.env['DETECTLANGUAGE_API_KEY']);


export default {

    name: 'translate',
    aliases: ['trans'],
    description: 'translate your text or a message.',





    async execute(Hina, msg, args) {

        if (!msg.reference) return await msg.reply('Please reply to the message you want to translate while using the command!');
        const {content: originalText} = await msg.fetchReference();

        Translate.engine = 'google';

        let [_to, _from] = args;
        if (_from) { Translate.from = _from }
        else {
            _from = await detectClient.detect(originalText);
            Translate.from = _from[0].language;
        };
        if (!_to) _to = 'en';
        Translate.to = _to;

        const translatedText = await Translate(originalText);

        
        await msg.reply(translatedText);
    },





    async slashExecute(Hina, interaction) {
        return;
    },
};