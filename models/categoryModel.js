const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subCategory: [{ type: String }],
    active:{type:Boolean,default:false}
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
