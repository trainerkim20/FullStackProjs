var Schema = mongoose.Schema;
const mongoose = require('mongoose');

var documentSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    url: {type: String, required: true}
    
});

module.exports = monogoose.model('Document', documentSchema);