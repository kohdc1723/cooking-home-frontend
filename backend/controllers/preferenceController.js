const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Preference = require("../models/Preference");

/**
 * @desc Get preference by id
 * @route GET /preference
 * @access Private
**/
const getPreference = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: "User id is required" });
    }

    const preference = await Preference.findOne({ user: userId }).exec();
    if (!preference || preference.length === 0) {
        return res.status(404).json({ message: "Preference not found" });
    } else {
        return res.json({ preference });
    }
});

/**
 * @desc Create preference
 * @route POST /preference
 * @access Private
**/
const createPreference = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "User id is required" });
    }

    const duplicate = await Preference.findOne({ user: userId }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: `Preference for user ${userId} already exists` });
    }

    const preference = await Preference.create({ user: userId });
    if (preference) {
        return res.status(201).json({ message: `Preference for user ${userId} is created` });
    } else {
        return res.status(400).json({ messge: "Invalid user data received" });
    }
});

/**
 * @desc Update preference
 * @route PATCH /preference
 * @access Private
**/
const updatePreference = asyncHandler(async (req, res) => {
    const { id, favorites, ingredients } = req.body;
    if (!id) {
        return res.status(400).json({ message: "Preference id is required" });
    }

    const preference = await Preference.findById(id).exec();
    if (!preference) {
        return res.status(400).json({ message: "Preference is not found" });
    }

    preference.favorites = favorites;
    preference.ingredients = ingredients;
    await preference.save();

    return res.json({ message: `Preference of ${id} is updated` });
});

module.exports = {
    getPreference,
    createPreference,
    updatePreference
};