const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 8080;
const dbhost = process.env.DB_HOST || 'localhost';
const dbport = process.env.DB_PORT || 27017;
const dbname = process.env.DB_NAME || 'accounts';
const mongoUrl = `mongodb://${dbhost}:${dbport}`;

app.get('/ping', (req, res) => res.end('pong'));

app.get('/', (req, res) => {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true },  (err, client) => {
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
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
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