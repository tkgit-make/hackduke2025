import startup from "../models/startupaccount.js"
import mongoose from 'mongoose' 
import postSchema from '../models/post.js'
const post = mongoose.model('post', postSchema); 

// Get all posts from a specific startup
export const getPosts = async (req, res) => {
    const { startupId } = req.params

    if(!mongoose.Types.ObjectId.isValid(startupId)) {
        return res.status(404).json({error: 'Invalid startup ID format'})
    }

    try {
        const startupAccount = await startup.findById(startupId)
        
        if (!startupAccount) {
            return res.status(404).json({error: 'Startup not found'})
        }
        
        // Sort posts by date, newest first
        const posts = [...startupAccount.postsData].sort((a, b) => b.createdAt - a.createdAt)
        
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get a specific post from a specific startup
export const getPost = async (req, res) => {
    const { startupId, postId } = req.params 

    if(!mongoose.Types.ObjectId.isValid(startupId) || !mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(404).json({error: 'Invalid ID format'})
    }

    try {
        const startupAccount = await startup.findById(startupId)

        if (!startupAccount) {
            return res.status(404).json({error: 'Startup not found'})
        }

        const post = startupAccount.postsData.find(post => post._id.toString() === postId)
        
        if (!post) {
            return res.status(404).json({error: 'Post not found'})
        }

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new post for a startup
export const createPost = async (req, res) => {
    const { startupId, title, content } = req.body

    if (!mongoose.Types.ObjectId.isValid(startupId)) {
        return res.status(404).json({error: 'Invalid startup ID format'})
    }

    try {
        const startupAccount = await startup.findById(startupId)
        
        if (!startupAccount) {
            return res.status(404).json({error: 'Startup not found'})
        }

        const newPost = {
            _id: new mongoose.Types.ObjectId(),
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        startupAccount.postsData.push(newPost)
        await startupAccount.save()

        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json({error: error.message})    
    }
}

// Delete a post
export const deletePost = async (req, res) => { 
    const { startupId, postId } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(startupId) || !mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(404).json({error: 'Invalid ID format'})
    }

    try {
        const startupAccount = await startup.findByIdAndUpdate(
            startupId,
            { $pull: { postsData: { _id: postId } } },
            { new: true }
        )

        if (!startupAccount) {
            return res.status(404).json({error: 'Startup not found'})
        }

        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error deleting post', details: error.message })
    }
}

// Update a post
export const updatePost = async (req, res) => {
    const { startupId, postId } = req.params
    const updates = req.body
    
    if(!mongoose.Types.ObjectId.isValid(startupId) || !mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(404).json({error: 'Invalid ID format'})
    }

    try {
        const startupAccount = await startup.findOneAndUpdate(
            { 
                _id: startupId,
                "postsData._id": postId 
            },
            { 
                $set: {
                    "postsData.$.title": updates.title,
                    "postsData.$.content": updates.content,
                    "postsData.$.updatedAt": new Date()
                }
            },
            { new: true }
        )

        if (!startupAccount) {
            return res.status(404).json({error: 'Startup or post not found'})
        }

        const updatedPost = startupAccount.postsData.find(post => post._id.toString() === postId)
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost })
    } catch (error) {
        res.status(500).json({ error: 'Error updating post', details: error.message })
    }
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
    const {userName, password, userInvestments, userCashAvailable} = req.body
  try {
    const useraccount = await uA.create({userName, password, userInvestments, userCashAvailable})
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