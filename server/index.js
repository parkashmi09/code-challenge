import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import useRouter from "../server/routes/user.js";
import Selector from "./models/sector.js";
import { data } from "./utils/data.js";
import cors from "cors"
import path from "path"

dotenv.config();

const PORT = 5001;

const __dirname= path.resolve()

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", useRouter);

app.use(express.static(path.join(__dirname,"/client/dist")));
app.get("*", (req, res)=>{
  res.sendFile(path.join(__dirname,"client", "dist", "index.html"))
})

// async function insertData(selectors) {
//     try {
//         if (mongoose.connection.readyState !== 1) {
//             throw new Error("MongoDB connection is not open.");
//         }

//         const result = await Selector.insertMany(selectors);
//     } catch (error) {
//         console.error("Error inserting data:", error);
//     }
// }
// const modifiedData = data?.map((sector) => ({
//     name: sector.name,
//     subGroups: sector.subGroups.map((subGroup) => ({ name: subGroup })),
// }));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database is connected");
        // insertData(modifiedData);

        // Selector.collection.drop()
    })
    .catch((error) => console.error("Error connecting to the database:", error));

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
