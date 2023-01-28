const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const data = require('./data/people.json');

dotenv.config();

const app = express();

connectDB();

app.use(express.static(__dirname + "/public"));
app.use("/images", express.static(__dirname + "/images"));

const PORT = process.env.PORT || 5000

app.get('/user/:id', (req, res) => {
    // res.send(`Get request is sending data on port ${PORT}`);
    console.log(req.params.id) // String
    let user = Number(req.params.id); //Number - Integer
    console.log(user);
    console.log(data[user]);
    res.json(data[user]);
})

// app.get('/item', (req, res) => {
//     // res.send(`Post request is sending data on port ${PORT}`);
//     // res.end();
//     res.redirect("https://facebook.com/");
// })

app.post('/item', (req, res) => {
    res.send(`Post request is sending data on port ${PORT}`);
})

app.put('/newItem', (req, res) => {
    res.send(`Put (Update) request is sending data on port ${PORT}`);
})

app.delete('/newItem', (req, res) => {
    res.send(`Delete request is sending data on port ${PORT}`);
})



app.listen(PORT, console.log(`Server Runinig in ${process.env.NODE_ENV} node on Port ${PORT}`));