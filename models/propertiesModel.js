const mongoose = require('mongoose');


const propertySchema = new mongoose.Schema({

    queryName: { type: String, unique: true, required: true },
    query: [{ questions: { type: String }, description: { type: String } }]




});



const Property = mongoose.model('Property', propertySchema);



module.exports = Property;