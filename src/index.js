
import express from 'express';


const app = express();

app.get('/', (req, res) => {
    res.send('It Works!')
});

app.listen(6969, () => console.log('Server is listening on http://localhost:6969...'));