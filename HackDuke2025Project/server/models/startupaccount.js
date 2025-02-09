import mongoose from 'mongoose'
import postSchema from '../models/post.js'

const Schema = mongoose.Schema

const fundingRoundSchema = new Schema({
    preMoneyValuation: {
        type: Number,
        required: true
    },
    fundingGoal: {
        type: Number,
        required: true
    },
    currentFunding: {
        type: Number,
        required: true,
        default: 0
    },
    roundType: {
        type: String,
        required: true,
        enum: ['Pre-Seed', 'Seed', 'Series A', 'Angel']
    },
    amountRaised: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        required: true
    },
    keyInvestors: [{
        type: String,
        required: false
    }]
});

const teamMemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: false
    }
});

const previousRoundSchema = new Schema({
    round: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    investors: {
        type: String,
        required: true
    }
});

const milestoneSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    fundingRequired: {
        type: Number,
        required: true
    }
});

const metricsSchema = new Schema({
    mrr: Number,
    growth: Number,
    users: Number,
    retention: Number
});

const socialMediaSchema = new Schema({
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
});

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
        maxLength: 140
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

    sharesAvailable: {
        type: Number,
        required: true,
    },

    totalSharesOffered: {
        type: Number,
        required: true,
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

    foundedDate: {
        type: Date,
        required: true,
    },

    teamMembers: [teamMemberSchema],

    fundingRounds: [fundingRoundSchema],

    minInvestment: {
        type: Number,
        required: true
    },
    maxInvestment: {
        type: Number,
        required: true
    },

    previousRounds: [previousRoundSchema],

    campaignDuration: {
        type: Number,
        required: true,
        default: 30
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    useOfFunds: {
        type: String,
        required: true
    },
    milestones: [milestoneSchema],

    marketSize: {
        type: Number,
        required: true
    },
    targetMarket: {
        type: String,
        required: true
    },
    competitors: String,
    competitiveAdvantage: String,
    currentRevenue: Number,
    revenueModel: String,
    customerBase: String,
    metrics: metricsSchema,

    pitchDeck: {
        type: String,
        required: true
    },
    financialProjections: {
        type: String,
        required: true
    },
    productImages: [String],
    videos: [String],
    website: String,
    socialMedia: socialMediaSchema,

    companyRegistration: {
        type: String,
        required: true
    },
    taxId: {
        type: String,
        required: true
    },
    legalStructure: {
        type: String,
        required: true
    },
    intellectualProperty: {
        type: String,
        required: true
    },
    regulatoryInfo: String,

}, {timestamps: true})

const startUp = mongoose.model('Startup', startUpSchema, 'startups'); 

export default startUp; 

