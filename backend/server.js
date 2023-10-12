require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const connectDb = require("./config/connectDb");

const PORT = process.env.PORT || 3500;

const app = express();

connectDb();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/usersRoutes"));

mongoose.connection.once("open", () => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
});

mongoose.connection.on("error", err => {
    console.error(err);
});