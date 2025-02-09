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

    userInvestments : [investmentSchema],

    userCashAvailable : {
        type : Number, 
        required : true 
    },

    walletBalance: {
        type: Number,
        default: 0,
        required: true
    }   
}, {timestamps: true})

// Method to add funds to the wallet
userAccountSchema.methods.addFunds = function(amount) {
    this.walletBalance += amount;
    return this.save();
};

// Method to deduct funds from the wallet
userAccountSchema.methods.deductFunds = function(amount) {
    if (this.walletBalance >= amount) {
        this.walletBalance -= amount;
        return this.save();
    } else {
        throw new Error('Insufficient funds in wallet');
    }
};

const uA = mongoose.model('userAccount', userAccountSchema); 
const invest = mongoose.model('investment', investmentSchema); 

export default uA; 

