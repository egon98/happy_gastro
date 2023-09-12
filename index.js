const { MongoClient } = require("mongodb");
require('dotenv').config();
const uri = process.env.DB_STRING;
const client = new MongoClient(uri);

const express = require("express");
const app = express();

let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', UserSchema);

async function run() {
    try {
        await client.connect();
        const database = client.db('test');
        const users = database.collection('users');
        // Query for a movie that has the title 'Back to the Future'
        const query = { username: 'egon' };
        const user = await users.findOne(query);
        console.log(user);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
