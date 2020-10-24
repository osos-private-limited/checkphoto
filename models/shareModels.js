const mongoose = require('mongoose');


const shareSchema = new mongoose.Schema({

    uuid: {type:String},
    link: { type: String },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{type:Date, default:Date.now()}

});



const Share = mongoose.model('Share', shareSchema);



module.exports = Share;