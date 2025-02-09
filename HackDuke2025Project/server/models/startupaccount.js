import mongoose from 'mongoose'
import postSchema from '../models/post.js'

const Schema = mongoose.Schema

const startUpSchema = new Schema({
    startupID : {
        type : Number,
        required : true, 
        unique : true
    },

    startUpName : {
        type : String,
        required : true, 
    },

    shortDescription: {
        type: String,
        required: true,
        maxLength: 150 // Limit for preview/cards
    },

    fullDescription: {
        type: String,
        required: true
    },

    homeLocation: {
        type: String,
        required: true,
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

    logo: {
        type: String,
        required: true, // Making it required since startups should have a logo
    },

    image: {
        type: String,
        required: false, // Keeping this as optional for banner/additional images
    },

    postsData : [postSchema], 

    tagsData : [{body : String}], 

    industry: {
        type: String,
        required: true,
        enum: ['CleanTech', 'FinTech', 'HealthTech', 'EdTech', 'AI/ML', 
               'Robotics', 'E-commerce', 'SaaS', 'Biotech', 'Other']
    },

    stage: {
        type: String,
        required: true,
        enum: ['Pre-Seed', 'Seed', 'Series A', 'Angel']
    },
}, {timestamps: true})

const startUp = mongoose.model('Startup', startUpSchema, 'startups'); 

export default startUp; 

