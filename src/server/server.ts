import 'dotenv/config';
import express from 'express';

/**
 * server app instance
 */
const app = express();

/**
 * simple token authentication
 */
app.use(async (req, res, next) => {
    const token = req.headers.authorization;

    /**
     * no token
     */
    if (!token) return res.sendStatus(401);

    /**
     * valid api token
     */
    if (token === process.env.HINA_API_TOKEN) return next();

    /**
     * invalid api token
     */
    res.sendStatus(401);
});

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

app.listen(3000, '0.0.0.0', () => {
    console.log('Express server is running on port 3000.');
});
