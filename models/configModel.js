const mongoose = require('mongoose');


const configSchema = new mongoose.Schema({
    feature: { type: String, unique: true, required: true },
    maxPhotos: {
        type: Number

    },
    maxVideos: {
        type: Number

    },
    mb: {
        type: String,

    },
    packages: [{
        day: { type: Number },
        range: { type: Number },
        cost: { type: Number }

    }],
    marketCategory: [
        {
            category: String,
            subCategory: [String]
        }
    ]


});



const Config = mongoose.model('Config', configSchema);



module.exports = Config;