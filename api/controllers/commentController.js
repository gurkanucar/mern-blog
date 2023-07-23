const CommentModel = require("../models/Comment");
const EntryModel = require("../models/Entry");
const UserModel = require("../models/User");


const createComment = async (req, res) => {
    const { content, userId, entryId } = req.body;

    const user = await UserModel.findById(userId).exec();
    const entry = await EntryModel.findById(entryId).exec();

    if (!user || !entry) {
        return res.status(404).json({ error: "User or Entry not found." });
    }

    const comment = new CommentModel({ content, user: userId, entity: entryId });
    await comment.save();

    entry.comments.push(comment._id);
    await entry.save();

    res.status(201).json(comment);

};

const getAllComments = async (req, res) => {
    const comments = await CommentModel.find().populate("user", "username email");
    res.json(comments);
};

const getCommentById = async (req, res) => {
    const { commentId } = req.params;
    const comment = await CommentModel.findById(commentId).populate("user", "username email");
    if (!comment) {
        return res.status(404).json({ error: "Comment not found." });
    }
    res.json(comment);
};

const updateCommentById = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const updatedComment = await CommentModel.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
    );
    if (!updatedComment) {
        return res.status(404).json({ error: "Comment not found." });
    }
    res.json(updatedComment);
};

const deleteCommentById = async (req, res) => {
    const { commentId } = req.params;

    const deletedComment = await CommentModel.findByIdAndDelete(commentId);
    if (!deletedComment) {
        return res.status(404).json({ error: "Comment not found." });
    }

    const entry = await EntryModel.findById(deletedComment.entity);
    if (entry) {
        entry.comments = entry.comments.filter(
            (comment) => comment.toString() !== commentId
        );
        await entry.save();
    }

    res.json({ message: "Comment deleted successfully." });
};

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateCommentById,
    deleteCommentById,
};
