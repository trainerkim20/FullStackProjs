var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const mongoose = require('mongoose');

var pokemonSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    nickname: {type: String},
    gender: {type: String, required: true},
    game: {type: String, required: true},
    imageUrl: {type: String, required: true},
});

module.exports = mongoose.model('Pokemon', pokemonSchema);