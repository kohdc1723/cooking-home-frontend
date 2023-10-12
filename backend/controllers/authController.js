const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

/**
 * @desc Login
 * @route POST /auth/login
 * @access Public
**/
const login = asyncHandler(async (req, res) => {
    // confirm request data
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // username doesn't exist in database
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // password doesn't match
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // create access token
    const accessToken = jwt.sign(
        { username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    // create refresh token
    const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    // create secure cookie with refresh token
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // accessible only by web server
        secure: true, // https
        sameSite: "none", // cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // send access token containing username and roles
    return res.json({ accessToken });
});

/**
 * @desc Refresh
 * @route GET /auth/refresh
 * @access Public
**/
const refresh = (req, res) => {
    // refresh token doesn't exist in cookies
    const cookies = req.cookies;

    if (!cookies?.refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.refreshToken;

    // verify refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, asyncHandler(async (err, decoded) => {
        // verify failed
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        
        // username not found in database
        const foundUser = await User.findOne({ username: decoded.username });
        if (!foundUser) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // create new access token
        const accessToken = jwt.sign(
            { username: foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        return res.json({ accessToken });
    }));
};

/**
 * @desc Logout
 * @route POST /auth/logout
 * @access Public
**/
const logout = (req, res) => {
    // refresh token doesn't exist in cookies
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        return res.sendStatus(204) // no content
    }

    // clear cookies
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    
    return res.json({ message: "cookie cleared" });
};

module.exports = {
    login,
    refresh,
    logout
};