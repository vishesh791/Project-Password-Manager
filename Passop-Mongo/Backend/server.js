const express = require('express');
const cors = require('cors');
const app=express();
app.use(cors());
app.use(express.json());

const dotenv = require('dotenv')
dotenv.config()


const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

//DataBase Name
const dbName = 'Passop';

const port = process.env.PORT ;

client.connect()

//Get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);

})

//Save a passwords
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    console.log(req.body);

    res.send({ success: true, data: findResult });
})

//Delete a password
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    console.log(req.body);

    res.send({ success: true, data: findResult });
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})