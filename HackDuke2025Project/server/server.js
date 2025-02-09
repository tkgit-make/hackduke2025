import express from "express";
import cors from "cors";
import startups from "./routes/startups.js";
import records from "./routes/userAccount.js";
import posts from "./routes/postRoute.js";
import dotenv from "dotenv";

// Configure dotenv to use config.env
dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5050;
const app = express();
import mongoose from "mongoose";

app.use(cors());
app.use(express.json());
app.use("/api/startups", startups)
app.use("/api/useraccounts", records)
app.use("/api", posts)

// Add error handling for missing URI
if (!process.env.ATLAS_URI) {
    console.error("ATLAS_URI is not defined in environment variables");
    process.exit(1);
}

mongoose.connect(process.env.ATLAS_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });



