const mongoose = require('mongoose');
const MapData = new mongoose.Schema({
    eventName: { type: String, default: "Sample" },
    coordinates: [{
        latitude: { type: Number },
        longitude: { type: Number },
        image: { type: String },
        imageSize: { type: Number },
        pop: { type: Boolean, default: false }
    }],
    active: { type: Boolean, default: false },
    eventImage: { type: String },
    mapName: { type: String, default: "osos" }

})

const MapICons = mongoose.model('MapData', MapData);

module.exports = MapICons;