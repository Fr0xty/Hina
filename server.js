import express from 'express';
const app = express();

app.get('/', (req, res) => res.send('Hina is online!'));

export default () => {
    app.listen(3000);
}