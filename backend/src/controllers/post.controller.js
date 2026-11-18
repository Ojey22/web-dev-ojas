import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Request body cannot be empty"
            });
        }

        const { name, description, age } = req.body;

        if (!name || !description || age === undefined || age === null || age === "") {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Name cannot be empty"
            });
        }

        if (typeof description !== "string" || !description.trim()) {
            return res.status(400).json({
                message: "Description cannot be empty"
            });
        }

        const parsedAge = Number(age);
        if (Number.isNaN(parsedAge) || !Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 150) {
            return res.status(400).json({
                message: "Age must be an integer between 1 and 150"
            });
        }

        const post = await Post.create({
            name: name.trim(),
            description: description.trim(),
            age: parsedAge
        });

        return res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const { name, description, age } = req.body;

        if (name !== undefined && (typeof name !== "string" || !name.trim())) {
            return res.status(400).json({
                message: "Name cannot be empty"
            });
        }

        if (description !== undefined && (typeof description !== "string" || !description.trim())) {
            return res.status(400).json({
                message: "Description cannot be empty"
            });
        }

        if (age !== undefined) {
            const parsedAge = Number(age);
            if (Number.isNaN(parsedAge) || !Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 150) {
                return res.status(400).json({
                    message: "Age must be an integer between 1 and 150"
                });
            }
        }

        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name.trim();
        if (description !== undefined) updateData.description = description.trim();
        if (age !== undefined) updateData.age = Number(age);

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
};
