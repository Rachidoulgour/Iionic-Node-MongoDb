const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    file: String,
    
    created_at: String,
    user: { type: Schema.ObjectId, ref: 'User'},
    
    
})
module.exports = mongoose.model('Publication', PublicationSchema);