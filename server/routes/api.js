/*------- IMPORTING MODULES ------ */

const express = require('express');
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






/* ------------------------------------ROUTES--------------------------------------- */


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


/*********    GET ONE USER for showing his data in the dashboard in the front ---- WORKING ------- 
 * BUT WHEN IT'S PRESENT EVENTS CANNOT BE DISPLAYED ! CONFLICTS WITH DASHBOARD   ------- CHECK USER SERVICE *********/
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


/*********  UPDATE USER (POST) (in dashboard too)   *********/
router.post('/edit/:userId', (req, res, next) => {
    User.findByIdAndUpdate({
        _id: req.params.userId
    }, req.body, (err, user) => {
        if (err) return next(err);
        console.log(user);
        res.json(req.body);
    });
});

/*********    /DELETE USER (DELETE) (in dashboard too)    *********/
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
//events routes, TODO: get the user able to post his own events in the events page 

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
router.get('/events/:id', function (req, res, next) {
    Event.findOne({
        _id: req.params.id
    }, function (err, event) { // same as .findById in this format like in "get single event"
        if (err) return next(err);
        res.json(event);
    });
});


/********* get all user posts ----- working but user can't post in his name ------ return an empty array  ********/
router.get('/posts/:userId', function (req, res, next) {
    User.findOne({
        _id: req.params.userId
    }, function (err, user) {
        if (err) return next(err);
        if (user) {
            Event.find({
                userId: user.id
            }, function (err, contents) {
                if (err) return next(err);
                res.json(contents);
            });
        }
    });
});



/*********   ADD an event  ------------ WORKING -------------   see how to link event and "owner" ********/
router.post('/postEvent/:userId', function (req, res, next) {
    User.findById({
        _id: req.params.userId
    }, function (err, user) {
        if (err) return next(err);
        if (user) {
            // let eventData = req.body;
            // let event = new Event(Data);
            let event = new Event(req.body);
            event.save(function (err) {
                if (err) return next(err);
                res.json(event);
            });
        }
    });
});






// edit event   ------- not working -----
// router.put('/editPost', (req, res, next) => {
//     Event.findOne({ _id: req.body._id }, (err, event) => {
//         if (err) return next(err);

//         if (event) {
//             event.name = req.body.name;
//             event.description = req.body.description;
//             event.category = req.body.category;
//             event.date = req.body.date;
//             event.save();
//             res.json(event);
//         }
//     });
// });

/*------------------------------- END EVENTS ROUTES -------------------------*/

module.exports = router;