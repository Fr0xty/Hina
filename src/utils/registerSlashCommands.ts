import 'dotenv/config';

import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import Hina from '../res/HinaClient.js';

export default async (slashCommands: SlashCommandBuilder[]) => {
    const hinaId = process.env.HINA_CLIENT_ID!;
    const rest = new REST({ version: '10' }).setToken(Hina.token!);

    try {
        // await rest.put(Routes.applicationCommands(hinaId), {
        await rest.put(Routes.applicationGuildCommands(hinaId, '859029044942471208'), {
            body: slashCommands,
        });

        console.log('Successfully registered application commands.');
    } catch (err) {
        console.error(err);
    }
};
