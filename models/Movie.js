//Activity
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Name is Required']
    },
    director: {
        type: String,
        required: [true, 'Duration is Required']
    },
    year: {
        type: Number,
        required: [true, 'Year is Required']
    },
    description: {
        type: String,
        required: [true, 'Description is Required'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is Required'],
    },
    comments: []
});

module.exports = mongoose.model('Movie', movieSchema);