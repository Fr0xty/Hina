import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.set('json spaces', 2);

app.get('/', async (req, res) => res.send('Hina is online!'));

app.get('/help/runtimes', async (req, res) => {
    // just pretty print json
    const result = await fetch('https://emkc.org/api/v2/piston/runtimes');
    res.json(await result.json());
});

export default () => {
    app.listen(3000);
};
