/*------- IMPORTING MODULES ------ */

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb://userlionel:passwordlionel@ds111410.mlab.com:11410/eventsdb";
/*  -------   */ 



/*------ DATABASE CONNECTION (ON A SERVER), BETTER TO GET THE APP EVERYWHERE---- */

mongoose.connect(db, err => {
    if(err) {
        console.error('Error in connecting mongodb' + err);
    } else {
        console.log('Connected to mongodb');
    }
})
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
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}
/*  -------   */ 



/* -----ROUTES----- */

//display this msg in localhost:3000/api 
router.get('/', (req, res) => {
    res.send('From API route')
})

// register = get user informations, save em in the db, return an err is there is one, and return user details if OK
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token})
        }
    })
})


// login => check user data entries to match with theses saved before
router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Unknown email')
            } else 
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password');
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});
            }
        }
    })
})


//events routes, TODO: get the user able to post his own events in the events page 
router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        }
    ];
    res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
    let specialEvents = [        
        {
            "_id": "1",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Super Project",
            "description": "Awesome",
            "category": "Angular",
            "date": "2018-06-23T18:25:43.511Z"
        }
    ];
    res.json(specialEvents);
})

module.exports = router;


