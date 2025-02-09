import uA from '../models/useraccount.js'
import mongoose from 'mongoose' 


export const getAccounts = async (req, res) => {
    const accounts = await uA.find({}).sort({userName: 1})
    res.status(200).json(accounts)
}

export const getAccount = async (req, res) => {
    const {id} = req.params 
    const account = await uA.findById(id)

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account not found'})
    }

    if (!account) {
        res.status(404).json({error: 'Account not found'})
    }
    res.status(200).json(account)
}

export const createUserAccount = async (req, res) => {
    const {userName, password, email, investorType, investorPreferences, userInvestments, userCashAvailable} = req.body
  try {
    const useraccount = await uA.create({userName, password, email, investorType, investorPreferences, userInvestments, userCashAvailable})
    res.status(200).json(useraccount)
  } catch (error) {
    res.status(400).json({error: error.message})    
  }
}

export const deleteUserAccount = async (req, res) => { 
    const {id} = req.params
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'Invalid account ID format'})
        }

        const account = await uA.findOneAndDelete({_id: id})
        
        if (!account) {
            return res.status(404).json({error: 'Account not found'})
        }

        res.status(200).json({ message: 'Account deleted successfully', account })
    } catch (error) {
        res.status(500).json({ error: 'Error deleting account', details: error.message })
    }
}

export const updateUserAccount = async (req, res) => {
    const {id} = req.params
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'Invalid account ID format'})
        }

        const account = await uA.findOneAndUpdate(
            {_id: id}, 
            {...req.body},
            { new: true } // This returns the updated document instead of the old one
        )

        if (!account) {
            return res.status(404).json({error: 'Account not found'})
        }

        res.status(200).json({ message: 'Account updated successfully', account })
    } catch (error) {
        res.status(500).json({ error: 'Error updating account', details: error.message })
    }
}

// Check Account credentials for login without password hashing
export const checkAccount = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const account = await uA.findOne({ email });

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Compare the entered password with the stored plain text password
        if (account.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // If password matches, return the account details (excluding the password)
        res.status(200).json({
            id: account._id,
            userName: account.userName,
            email: account.email,
            investorType: account.investorType,
            userCashAvailable: account.userCashAvailable,
            // Include other necessary fields if needed
        });
    } catch (error) {
        res.status(500).json({ error: 'Error checking account', details: error.message });
    }
}
