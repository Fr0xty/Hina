import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import Hina from '../res/HinaClient.js';

export default async (slashCommands: SlashCommandBuilder[]) => {
    const hinaId = process.env.HINA_CLIENT_ID!;
    const rest = new REST({ version: '10' }).setToken(Hina.token!);

    try {
        if (process.env.REGISTER_COMMANDS_DEBUG) {
            await rest.put(Routes.applicationGuildCommands(hinaId, '859029044942471208'), {
                body: slashCommands,
            });
            console.log('Successfully registered application guild commands.');
        } else {
            await rest.put(Routes.applicationCommands(hinaId), {
                body: slashCommands,
            });
            console.log('Successfully registered application global commands.');
        }
    } catch (err) {
        console.error(err);
    }
};
