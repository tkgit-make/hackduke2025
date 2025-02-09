const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    id : {
        type : Number, 
        required : true
    }, 

    likesData : {
        type : Number, 
        required : true
    }, 

    photos : [{photoLocation : String}], 

    caption : {
        type : String, 
        required : true
    }
}, {timestamps: true})

module.exports = postSchema; 

