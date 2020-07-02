var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const mongoose = require('mongoose');

var contactSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    imageUrl: {type: String, required: true},
    group: {type: Schema.Types.ObjectId, ref: 'Contact'}
});

module.exports = mongoose.model('Contact', contactSchema);