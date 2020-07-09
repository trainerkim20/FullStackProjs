const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const sequenceSchema = mongoose.Schema({
    maxPokemonId: {type: Number, required: true},
    
});

module.exports = mongoose.model('Sequence', sequenceSchema);