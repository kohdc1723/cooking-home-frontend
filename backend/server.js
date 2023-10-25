require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const connectDb = require("./config/connectDb");
const { logger, logEvents } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 3500;

const app = express();

connectDb();

// middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routers
app.use("/", require("./routes/rootRoutes")); // public
app.use("/auth", require("./routes/authRoutes")); // public
app.use("/users", require("./routes/usersRoutes")); // private
app.use("/preference", require("./routes/preferenceRoutes")); // private
// catch all
app.all("*", (req, res) => {
    res.status(404);

    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 not found" });
    } else {
        res.type("txt").send("404 not found");
    }
});
// error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

mongoose.connection.on("error", err => {
    console.error(err);

    const error = `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`;
    const filename = "mongoErrorLog.log";
    logEvents(error, filename);
});