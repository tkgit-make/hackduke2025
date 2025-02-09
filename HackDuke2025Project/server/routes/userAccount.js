import express from "express"

import {
  createUserAccount,
  getAccounts,
  getAccount,
  deleteUserAccount,
  updateUserAccount
} from '../controllers/userAccountController.js'

// This will help us connect to the database
import db from "../db/connection.js"

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb"

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();


// This section will help you get a list of all the records.
router.get("/", getAccounts)

// This section will help you get a single record by id
router.get("/:id", getAccount)

// This section will help you create a new record.
router.post("/", createUserAccount)

// This section will help you update a record by id.
router.patch("/:id", updateUserAccount);

// This section will help you delete a record
router.delete("/:id", deleteUserAccount);

export default router;