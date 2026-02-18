import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors({
    origin: "https://codevirus-insights.vercel.app"
}));
app.use(express.json());


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend running ");
});


app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
