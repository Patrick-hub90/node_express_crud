var mongoose = require('mongoose');
var schema = mongoose.Schema;

var blog = new schema({
    titre:{
        type: String ,
        required: true
    },
    bref:{
        type: String,
        required: true
    },
    containts: {
        type: String,
        required: true
    }
},{timestamps: true});
var Blog = mongoose.model("Blogs",blog);

module.exports = Blog;