import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
    id : {
        type : Number, 
        required : true,
        unique : true
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

export default postSchema; 

