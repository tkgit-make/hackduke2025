import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();
import mongoose from "mongoose";

app.use(cors());
app.use(express.json());
app.use("/record", records);


mongoose.connect(process.env.ATLAS_URI).then(() => {
    // start the Express server
    app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

})
    .catch((error) => {
        console.log(error)
    })



