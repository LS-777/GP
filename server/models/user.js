const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        match: /^[a-zA-Z0-9-_]+$/, // prevent from using banned chracters or malicious scripts
        required: true,
        trim: true,   // suppresses blank spaces at the start and the end of a string
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true //data process before saving it in DB
    },
    password: {
        type: String,
        required: true
    },
    // userEvents: [{                          // adding event id to an array for all events created by the user 
    //     type: Schema.Types.ObjectId,
    //     ref: 'Event'
    // }]

});

module.exports = mongoose.model('User', userSchema, 'users');



