/* here is the controller */



/*------- IMPORTING MODULES ------ */

const express = require('express');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');

const mongoose = require('mongoose');

const db = "mongodb://userlionel:passwordlionel@ds111410.mlab.com:11410/eventsdb";
mongoose.Promise = global.Promise; // i don't know what it does
/*  -------   */




/*------ DATABASE CONNECTION (ON A SERVER), BETTER TO GET THE APP EVERYWHERE---- */
mongoose.connect(db, err => {
    if (err) {
        console.error('Error in connecting mongodb' + err);
    } else {
        console.log('Connected to mongodb');
    }
});
/*  -------   */


/* -----TOKEN MANAGEMENT -------*/
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === "null") {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}


/**** function sendToken() will be often used    ******/
function sendToken(user, res) {
    let token = jwt.sign(user.id, 'secretKey');
    console.log(user);

    res.status(200).json({
        userId: user.id,
        token
    });
}
/*----------- END TOKEN MANAGEMENT ------------*/






/* ===============================   ROUTES   ============================================== */


//display this msg in localhost:3000/api to check if all works
router.get('/', (req, res) => {
    res.send('From API route');
});



/* --------------------------- USERS ---------------------------*/

/********* GET ALL USERS IN A LIST for seeing em here instead of going to m-lab all 5minutes, only in the back(:3000) ------ WORKING -----   *********/
router.get('/userlist', function (req, res) {
    User.find({}, function (err, users) {
        var userMap = {};

        users.forEach(function (user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
});


/*********    GET ONE USER for showing his data in the dashboard in the front ---- WORKING -------*********/
router.get('/user/:userId', (req, res, next) => {
    User.findById({
        _id: req.params.userId
    }, (err, user) => {
        if (err) return next(err);

        if (user) {
            res.json(user);
        }
    });
});



/*********  register = get user informations, save em in the db, return an err if there is one, and return user details if OK(removed here)   ---- WORKING -------  *******/
router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        } else {
            sendToken(user, res);
        }
    });
});


/*********    login => check user data entries to match with theses saved before    ---- WORKING -------  **********/
router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({
        email: userData.email
    }, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Unknown email');
            } else
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password');
            } else {
                sendToken(user, res);
            }
        }
    });
});


/*********  UPDATE USER (in dashboard too)   *********/
router.post('/edit/:userId', (req, res, next) => {
    User.findByIdAndUpdate({
        _id: req.params.userId
    }, req.body, (err, user) => {
        if (err) return next(err);
        console.log(user);
        res.json(req.body);
    });
});

/*********    DELETE USER (in dashboard too)    *********/
router.delete('/remove/:userId', (req, res, next) => {
    User.findByIdAndRemove({
        _id: req.params.userId
    }, req.body, (err, user) => {
        if (err) return next(err);
        console.log(user);
        res.json(req.body);
    });
});





/*-------------END USERS ROUTES---------------- */


/* --------------------------- EVENTS ---------------------*/

/********* GET all events    ----------- WORKING   ---------   *******/
router.get('/events', function (req, res) {
    console.log('fetching all events');
    Event.find({})
        .exec(function (err, events) {
            if (err) {
                console.log("error retrieving events");
            } else {
                res.json(events);
            }
        });
});


/*********  GET one event    -------- WORKING   -------    *********/
router.get('/events/:id', function (req, res) {
    console.log('Get request for a single event');
    Event.findById(req.params.id)
        .exec(function (err, event) {
            if (err) {
                console.log('Error retrieving event');
            } else {
                res.json(event);
            }
        });
});



/*********   ADD an event  ------------ WORKING ------------- */
router.post('/events/add', function (req, res, next) { //('/events/add/:username' de base
    let event = new Event(req.body);

    event.save(function (err) {
        if (err) return next(err);
        res.json(event);
    });
});



/*********   UPDATE an event  ------------ WORKING -------------*/

router.put('/events/update/:id', function (req, res) {
    console.log('Update event');
    Event.findByIdAndUpdate(req.params.id, 
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                contact: req.body.contact,
                date: req.body.date
            }
        },
        {
            new: true
        },
        function(err, updatedEvent) {
            if(err){
                res.send("Error updating event");
            } else {
                res.json(updatedEvent);
            }
        }
    );
});




/*********   DELETE an event  ------------ WORKING -------------  ********/

router.delete('/events/delete/:id', function(req, res){
    console.log('Deleting an event');
    Event.findByIdAndRemove(req.params.id, function(err, deletedEvent){
        if(err) {
            res.send("Error deleting event");
        } else {
            res.json(deletedEvent);
        }
    });
});


























module.exports = router;