import mongoose from 'mongoose'

const Schema = mongoose.Schema

const investmentSchema = new Schema({
    startupID : {
        type : Number,
        required : true, 
        unique : true
    },

    totalPayment : {
        type : Number,
        required : true, 
    },

    totalShares : {
        type : Number,
        required : true, 
    },

    equityContract : {
        type : String, 
        required : true,
    }
}, {timestamps: true})

const userAccountSchema = new Schema({
    userName : {
        type : String, 
        required : true
    },

    email : {
        type : String, 
        required : true
    },

    password : {
        type : String, 
        required : true
    },

    investorType : {
        type : String, 
        required : true
    },

    investorPreferences : {
        type : [{body : String}], 
        required : false
    },

    userInvestments : [investmentSchema],

    userCashAvailable : {
        type : Number, 
        required : false 
    }   
}, {timestamps: true})

const uA = mongoose.model('userAccount', userAccountSchema); 
const invest = mongoose.model('investment', investmentSchema); 

export default uA; 

