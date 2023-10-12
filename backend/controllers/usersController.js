const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

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

module.exports = {
    createUser
};