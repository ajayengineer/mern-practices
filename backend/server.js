const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const data = require('./data/people.json');
const favicon = require("serve-favicon");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const Contact = require("./models/contactModel");


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

//For Createing API and script for sending data in mongodab and connect with frontend
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CRUD Operations Contact Routes

//@path /contact
//@desc adding new contact
//@method post
//@access public
app.route("/contact").post((req, res) => {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
});


//@path /contact
//@desc getting all contacts created
//@method get
//@access public
app.route("/contact").get((req, res) => {
    Contact.find({}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
});

//@path /contact/:contactID
//@desc getting contact by ID
//@method get
//@access public
app.route("/contact/:contactID").get((req, res) => {
    Contact.findById(req.params.contactID, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
});

//@path /contact/:contactID
//@desc updating contact by ID
//@method put
//@access public
app.route("/contact/:contactID").put((req, res) => {
    Contact.findOneAndUpdate(
        { _id: req.params.contactID },
        req.body,
        { new: true, useFindAndModify: false },
        (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        }
    );
});

//@path /contact/:contactID
//@desc deleting contact by ID
//@method delete
//@access public
app.route("/contact/:contactID").delete((req, res) => {
    Contact.deleteOne({ _id: req.params.contactID }, (err, message) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: "contact successfully deleted" });
    });
});

//CRUD Operations Contact Routes END

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