const mongoose = require('mongoose');
const {Schema} = mongoose

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    dob : {
        type : String,
    },
    states : [
        {
            type: Schema.Types.ObjectId, 
            ref : 'state'
        }
    ],
    ments : {
        type : Number,
    }
})

module.exports = User = mongoose.model('user', UserSchema);