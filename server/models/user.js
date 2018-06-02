const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,       
        required: true,
        unique: true,
        lowercase: true         //traitement d'une donnée avant insertion en BDD
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema, 'users');