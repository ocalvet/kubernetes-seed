const express = require('express');
const app = express();
const port = process.env.APP_PORT || 8080;

app.get('/', (req, res) => {
    res.json([{
        _id: '123444',
        name: 'checking 1'
    }]);
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});