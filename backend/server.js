require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./config/connectDb");

const PORT = process.env.PORT || 3500;

const app = express();

connectDb();

app.get("/", (req, res) => {
    res.send("Hello");
});

mongoose.connection.once("open", () => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
});

mongoose.connection.on("error", err => {
    console.error(err);
});