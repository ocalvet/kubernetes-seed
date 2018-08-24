const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 8080;
const mongoUrl = process.env.DB_URL || 'mongodb://localhost:27017';
const connectOptions = { 
    useNewUrlParser: true, 
};
const dbname = 'users';

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
            { name: 'Jack', age: 23 },
            { name: 'Peter', age: 43 },
            { name: 'Jane', age: 16 },
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