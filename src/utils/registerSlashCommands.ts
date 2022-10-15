import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import Hina from '../res/HinaClient';

export default async (slashCommands: SlashCommandBuilder[]) => {
    const hinaId = '769125937731338290';
    const rest = new REST({ version: '10' }).setToken(Hina.token!);

    try {
        await rest.put(Routes.applicationCommands(hinaId), {
            body: slashCommands,
        });

        console.log('Successfully registered application commands.');
    } catch (err) {
        console.error(err);
    }
};
