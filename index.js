const { MongoClient } = require("mongodb");
require('dotenv').config();
const uri = process.env.DB_STRING;
const client = new MongoClient(uri);
const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as templating engine
app.set('view engine', 'ejs');

let mongoose = require('mongoose');
const Routes = require("./routes")
app.use(Routes);

module.exports = Routes;

mongoose.connect(uri);

app.listen(PORT, () => {
    console.log(`Server started at localhost:${PORT}`);
});