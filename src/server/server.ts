import 'dotenv/config';
import express from 'express';

/**
 * server app instance
 */
const app = express();

/**
 * express routers
 */
import apiRouter from './routes/api/api.js';
app.use('/api', apiRouter);

/**
 * simple routes
 */
app.get('/invite', async (req, res) => {
    res.redirect(process.env.HINA_INVITE_URL!);
});

app.get('/repository', async (req, res) => {
    res.redirect('https://github.com/Fr0xty/Hina');
});

app.listen(3000);
