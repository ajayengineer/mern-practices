const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const data = require('./data/people.json');
const favicon = require("serve-favicon");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
// const Contact = require("./models/contactModel");


dotenv.config();

const app = express();

connectDB();

//init middleware
//parse applications/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//parse application/json
app.use(express.json());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use("/images", express.static(__dirname + "/images"));

const PORT = process.env.PORT || 5000

app.get('/user/:id', (req, res, next) => {
    // res.send(`Get request is sending data on port ${PORT}`);
    console.log(req.params.id) // String
    let user = Number(req.params.id); //Number - Integer
    console.log(user);
    console.log(data[user]);
    res.json(data[user]);
    next();
}, (res, req) => {
    console.log("The second function called!!");
}
);

app.route('/profiles')
    .get((req, res) => {
        // throw new Error();
        // res.send(`Get request is sending data on port ${PORT}`);
        console.log(`Request from : ${req.originalUrl}`);
        console.log(`Request type : ${req.method}`);
        res.json(data);
    })
    .post((req, res) => {
        console.log(req.body);
        res.send(req.body);
    })
    .put((req, res) => {
        res.send(`Put (Update) request is sending data on port ${PORT}`);
    })
    .delete((req, res) => {
        res.send(`Delete request is sending data on port ${PORT}`);
    });


//Error Handaling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(`<h1> Red Alert </h1> ${err.stack}`);
})

app.listen(
    PORT,
    console.log(`Server Runinig in ${process.env.NODE_ENV} node on Port ${PORT}`)
);