const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 8080;
const mongoUrl = process.env.DB_URL || 'mongodb://localhost:27017';
const connectOptions = { 
    useNewUrlParser: true, 
};
const dbname = 'accounts';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/ping', (req, res) => res.end('pong'));

app.get('/', (req, res) => {
    MongoClient.connect(mongoUrl, connectOptions,  (err, client) => {
        if (err) {
            res.statusCode = 400;
            res.json({...err});
            return;
        }
        db = client.db(dbname);
        const collection = db.collection('documents');
        collection.find({}).toArray((err, docs) => {
            if (err) {
                res.statusCode = 400;
                res.json({...err});
                return;
            }
            res.json(docs);
        });
    });
});

app.post('/seed', (req, res) => {
    MongoClient.connect(mongoUrl, connectOptions, (err, client) => {
        if (err) {
            res.statusCode = 400;
            res.json({...err});
            return;
        }
        db = client.db(dbname);
        const collection = db.collection('documents');
        collection.insertMany([
            { name: 'checkings 1', amount: 3000 },
            { name: 'checkings 2', amount: 50400 },
            { name: 'checkings 3', amount: 12000 },
            { name: 'checkings 4', amount: 43000 },
        ], (err, result) => {
            if (err) {
                res.statusCode = 400;
                res.json({...err});
                return;
            }
            res.json(result.insertedIds);
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});