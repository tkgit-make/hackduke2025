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

    password : {
        type : String, 
        required : true
    },

    userInvestments : [investmentSchema],

    userCashAvailable : {
        type : Number, 
        required : true 
    }   
}, {timestamps: true})

const uA = mongoose.model('userAccount', userAccountSchema); 
const invest = mongoose.model('investment', investmentSchema); 

export default uA; 

