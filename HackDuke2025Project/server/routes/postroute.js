import express from "express"

import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} from '../controllers/postController.js'



// This will help us connect to the database
import db from "../db/connection.js"

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb"

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();


// Get all posts for a specific startup
router.get("/startup/:startupId", getPosts)

// Get a single post from a specific startup
router.get("/startup/:startupId/post/:postId", getPost)

// Create a new post for a specific startup
router.post("/startup/:startupId/post", createPost)

// Update a specific post from a specific startup
router.patch("/startup/:startupId/post/:postId", updatePost)

// Delete a specific post from a specific startup
router.delete("/startup/:startupId/post/:postId", deletePost)

export default router;