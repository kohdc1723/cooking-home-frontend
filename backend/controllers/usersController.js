const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
**/
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean();

    if (!users) {
        return res.status(400).json({ message: "no users found" });
    } else {
        return res.json(users);
    }
});

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
// const updateUser = asyncHandler(async (req, res) => {
//     const { id, username, password } = req.body;

//     // confirm body data
//     if (!id || !username || !password) {
//         return res.status(400).json({ message: "all fields are required" });
//     }

//     // confirm the user existence
//     const user = await User.findById(id).exec();
//     if (!user) {
//         return res.status(400).json({ message: "user not found" });
//     }

//     // check for duplicate
//     const duplicate = await User.findOne({ username }).collation({ locale: "en", strength: 2 }).lean().exec();
//     // allow updates to the original user
//     if (duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: "duplicate username" });
//     }

//     // update the user
//     user.username = username;
//     user.roles = roles;
//     user.active = active;
//     if (password) user.password = await bcrypt.hash(password, 10);

//     const updatedUser = await user.save();

//     return res.json({ message: `${updatedUser.username} updated` });
// });

module.exports = {
    getAllUsers,
    getUser,
    createUser
};