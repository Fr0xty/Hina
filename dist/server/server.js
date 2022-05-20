import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname, '..', 'build')));
import hinawebRouter from './routes/api/private/hinaweb.js';
import fetchavatarhistoryRouter from './routes/api/private/fetchavatarhistory.js';
app.use('/api/hinaweb', hinawebRouter);
app.use('/api/fetch-avatar-history', fetchavatarhistoryRouter);
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
app.get('/help/runtimes', async (req, res) => {
    const result = await fetch('https://emkc.org/api/v2/piston/runtimes');
    res.json(await result.json());
});
app.listen(3000);
