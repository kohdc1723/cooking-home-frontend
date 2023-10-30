const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Preference = require("../models/Preference");

/**
 * @desc Get a user by id
 * @route GET /users
 * @access Private
**/
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // confirm req data
    if (!id) {
        return res.status(400).json({ message: "user id required" });
    }

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    } else {
        return res.json({ user });
    }
});

/**
 * @desc Create new user
 * @route POST /users
 * @access Private
**/
const createUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    
    // confirm request body
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // check for duplicate username
    const duplicate = await User.findOne({ username }).collation({ locale: "en", strength: 2 }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: "Username already exists" });
    }

    // hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create a user
    const user = await User.create({ username, password: hashedPassword });

    // send response
    if (user) {
        return res.status(200).json({ message: `New user ${username} created` });
    } else {
        return res.status(400).json({ message: `Invalid input received` });
    }
});

/**
 * @desc Update a user
 * @route PATCH /users
 * @access Private
**/
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password } = req.body;

    // confirm body data
    if (!id || !username) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // confirm the user existence
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: "User is not found" });
    }

    // check for duplicate
    const duplicate = await User.findOne({ username }).collation({ locale: "en", strength: 2 }).lean().exec();
    // allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Username already exists" });
    }

    // update the user
    user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);

    const updatedUser = await user.save();

    // create refresh token
    const refreshToken = jwt.sign(
        { username: updatedUser.username },
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

    return res.json({ message: `User ${updatedUser.username} is updated` });
});

/**
 * @desc Delete a user
 * @route DELETE /users
 * @access Private
**/
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "User id is required" });
    }

    const preference = await Preference.findOne({ user: id }).lean().exec();
    if (preference) {
        await Preference.deleteOne({ user: id }).exec();
    }

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(404).json({ message: "User is not found" });
    } else {
        await user.deleteOne();
        return res.json({ message: "User and its preference are deleted" });
    }
});

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
};