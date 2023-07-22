const express = require("express");
const EntryModel = require("../models/Entry");
const UserModel = require("../models/User");
const router = express.Router();

const createEntry = async (req, res, next) => {
  const { name, content, tags, createdBy } = req.body;

  const user = await UserModel.findById(createdBy).exec();

  if (!user) {
    return next({ statusCode: 404, message: "User not found." });
  }

  const entry = new EntryModel({ name, content, tags, createdBy });

  try {
    await entry.save();
    user.entries.push(entry._id);
    await user.save();

    res.status(201).json(entry);
  } catch (error) {
    return next({ statusCode: 500, message: "Error creating entry." });
  }
};

const getAllEntries = async (req, res, next) => {
  console.log(req.authenticatedUser);
  const entries = await EntryModel.find().populate(
    "createdBy",
    "username email"
  );
  res.json(entries);
};

const getEntryBySlug = async (req, res) => {
  const { slug } = req.params;
  const entry = await EntryModel.findOne({ slug }).populate(
    "createdBy",
    "username email"
  );
  if (!entry) {
    const error = new Error("Entry not found.");
    error.statusCode = 404;
    throw error;
  }
  res.json(entry);
};

const updateEntryBySlug = async (req, res) => {
  const { slug } = req.params;
  const { name, content, tags, createdBy } = req.body;
  const updatedEntry = await EntryModel.findOneAndUpdate(
    { slug },
    { name, content, tags, createdBy },
    { new: true }
  );
  if (!updatedEntry) {
    const error = new Error("Entry not found.");
    error.statusCode = 404;
    throw error;
  }
  res.json(updatedEntry);
};

const deleteEntryBySlug = async (req, res) => {
  const { slug } = req.params;
  const deletedEntry = await EntryModel.findOneAndDelete({ slug });
  if (!deletedEntry) {
    const error = new Error("Entry not found.");
    error.statusCode = 404;
    throw error;
  }
  res.json({ message: "Entry deleted successfully." });
};

const likeEntry = async (req, res) => {
  const { entryId } = req.params;
  const { userId } = req.body;

  const entry = await EntryModel.findById(entryId);
  const user = await UserModel.findById(userId);

  if (!entry || !user) {
    return res.status(404).json({ error: "Entry or User not found." });
  }

  if (entry.likes.includes(userId)) {
    return res.status(400).json({ error: "User already liked the entry." });
  }

  entry.likes.push(userId);
  await entry.save();

  res.json(entry);
};

const getLikedEntries = async (req, res) => {
  const { userId } = req.params;

  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const likedEntries = await EntryModel.find({ likes: userId });

  res.json(likedEntries);
};

const unlikeEntry = async (req, res) => {
  const { entryId } = req.params;
  const { userId } = req.body;

  const entry = await EntryModel.findById(entryId);
  const user = await UserModel.findById(userId);

  if (!entry || !user) {
    return res.status(404).json({ error: "Entry or User not found." });
  }

  if (!entry.likes.includes(userId)) {
    return res.status(400).json({ error: "User has not liked the entry." });
  }

  entry.likes = entry.likes.filter(
    (likedUserId) => likedUserId.toString() !== userId
  );
  await entry.save();

  res.json(entry);
};

const getLikedUsersForEntity = async (req, res) => {
  const { entryId } = req.params;

  const entity = await EntryModel.findById(entryId).populate(
    "likes",
    "username name"
  );

  if (!entity) {
    return res.status(404).json({ error: "Entity not found." });
  }

  const likedUsers = entity.likes;
  res.json(likedUsers);
};

module.exports = {
  createEntry,
  getAllEntries,
  getEntryBySlug,
  updateEntryBySlug,
  deleteEntryBySlug,
  likeEntry,
  getLikedEntries,
  unlikeEntry,
  getLikedUsersForEntity,
};
