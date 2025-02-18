const mongoose = require('mongoose');

const Postchema = new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    content: {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Post",Postchema);