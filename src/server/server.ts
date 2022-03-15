import express from 'express';

/**
 * server app instance
 */
const app = express();

/**
 * express routers
 */
import hinawebRouter from './routes/api/private/hinaweb.js';
import avatarhistoryRouter from './routes/api/private/fetchavatarhistory.js';
app.use('/api/hinaweb', hinawebRouter);
app.use('/api/fetch-avatar-history', avatarhistoryRouter);

/**
 * homepage
 */
app.get('/', async (req, res) => res.send('Hina is online!'));

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
