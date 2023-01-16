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
 * run server
 */
app.listen(3000, () => {
    console.log('Express server is running on port 3000.');
});
