const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 8080;
const mongoUrl = process.env.DB_URL || 'mongodb://localhost:27017';
const connectOptions = { 
    useNewUrlParser: true, 
};
const dbname = 'shippings';

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
            { address: '1234 abc st', date: '2018/04/11' },
            { address: '567 fdg st', date: '2017/01/02'  },
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