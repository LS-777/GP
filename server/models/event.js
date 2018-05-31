const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
});

const model = mongoose.model('event', eventSchema, 'events');

module.exports = model;