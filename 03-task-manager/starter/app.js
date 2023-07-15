const express = require('express');
const app = express();
const PORT = 8080;

app.listen(PORT, () => {`Listening on port ${PORT}...`});

app.get('/', (req,res) => {
    res.send('Hi');
});