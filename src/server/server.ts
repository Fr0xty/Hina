import 'dotenv/config';
import express from 'express';

// import apiRouter from './routes/api/api.js';

const app = express();

/**
 * simple token authentication
 */
app.use(async (req, res, next) => {
    const token = req.headers.authorization;
    if (token !== process.env.EXPRESS_API_TOKEN) res.sendStatus(401);

    next();
});

// app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('Express server is running on port 3000.');
});
