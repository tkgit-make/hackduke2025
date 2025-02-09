const mongoose = require('mongoose')
const postSchema = require('./post')

const Schema = mongoose.Schema

const startUpSchema = new Schema({
    startupID : {
        type : Number,
        required : true, 
    },

    startUpName : {
        type : String,
        required : true, 
    },

    description : {
        type : String,
        required : true, 
    },

    targetGoal : {
        type : Number,
        required : true, 
    },

    totalRaised : {
        type : Number,
        required : true, 
    },

    equityPerShare : {
        type : Number,
        required : false, 
    },

    pricePerShare : {
        type : Number, 
        required : true,
    },

    image : {
        type : String,
        required : false, 
    },

    postsData : [postSchema], 

    tagsData : [{body : String}], 
}, {timestamps: true})

const startUp = mongoose.model('startup', startUpSchema); 

module.exports = startUp; 

