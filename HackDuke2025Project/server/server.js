import express from "express";
import cors from "cors";
import startups from "./routes/startups.js";

import records from "./routes/userAccount.js";
import posts from "./routes/postRoute.js";

const PORT = process.env.PORT || 5050;
const app = express();
import mongoose from "mongoose";

app.use(cors());
app.use(express.json());
app.use("/api/startups", startups)
app.use("/api/useraccounts", records)
app.use("/api", posts)


mongoose.connect(process.env.ATLAS_URI).then(() => {
    // start the Express server
    app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

})
    .catch((error) => {
        console.log(error)
    })



