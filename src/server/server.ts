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
import apiRouter from './routes/api/api.js';
app.use('/api', apiRouter);

/**
 * for repl command
 * TODO: let react router handle this endpoint
 */
app.get('/help/runtimes', async (req, res) => {
    // just pretty print json
    const result = await fetch('https://emkc.org/api/v2/piston/runtimes');
    res.json(await result.json());
});

/**
 * simple routes
 */
app.get('/invite', async (req, res) => {
    res.redirect(
        'https://discord.com/api/oauth2/authorize?client_id=769125937731338290&permissions=8&scope=bot%20applications.commands'
    );
});

app.get('/repository', async (req, res) => {
    res.redirect('https://github.com/Fr0xty/Hina');
});

app.get('/discord', async (req, res) => {
    res.redirect('https://discord.gg/VtQRrVCxg8');
});

/**
 * render React webapp
 */
app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(3000);
