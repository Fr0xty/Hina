import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * consts that are not available in ES Module of 'path'.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * server app instance
 */
const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));

/**
 * express routers
 */
import hinawebRouter from './routes/api/private/hinaweb.js';
import fetchavatarhistoryRouter from './routes/api/private/fetchavatarhistory.js';
app.use('/api/hinaweb', hinawebRouter);
app.use('api/fetchavatarhistory', fetchavatarhistoryRouter);

/**
 * render React webapp
 */
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

/**
 * for repl command
 * TODO: let react router handle this endpoint
 */
app.get('/help/runtimes', async (req, res) => {
    // just pretty print json
    const result = await fetch('https://emkc.org/api/v2/piston/runtimes');
    res.json(await result.json());
});

export default () => {
    app.listen(3000);
};
