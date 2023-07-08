const express = require('express')
const router = express.Router()
const Post = require("../models/Post")
const Like = require("../models/Like")
const Comment = require("../models/Comment")
const User = require('../models/User')

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

router.get("/posts/profile/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Fetch the logged-in user's friends
        //fetch all posts of a user
        const userIds = await User.find({ _id: userId }, { _id: 0, name: 0, email: 0, password: 0, location: 0, bio: 0, registrationDate: 0, __v: 0 })
        // console.log(userIds)

        const result = [];
        for (let i = 0; i < userIds[0].friends.length; i++) {
            const user = userIds[0].friends[i];
            const posts = await Post.find({ userId: user.friendId }).populate({ path: 'userId', model: User, select: 'name email profilePicture' })
            const postsWithLikes = await Promise.all(
                posts.map(async (post) => {
                    const likes = await Like.find({ targetId: post._id }, { _id: 0, timestamp: 0, __v: 0 });
                    return { post, likes };
                })
            );

            const postsWithLikesAndComments = await Promise.all(
                postsWithLikes.map(async (postWithLikes) => {
                    const comments = await Comment.find({ targetId: postWithLikes.post._id }, { _id: 0, __v: 0 }).populate({ path: 'userId', model: User, select: 'name profilePicture' });
                    return { post: postWithLikes.post, likes: postWithLikes.likes, comments };
                })
            );
            result.push(...postsWithLikesAndComments);
        }
        const result1 = shuffleArray(result)
        res.status(200).json(result1);
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
})

router.get("/userposts/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = [];
        const posts = await Post.find({ userId: userId }).sort({ timestamp: 1 }).populate({ path: 'userId', model: User, select: 'name email profilePicture' })
        const postsWithLikes = await Promise.all(
            posts.map(async (post) => {
                const likes = await Like.find({ targetId: post._id }, { _id: 0, timestamp: 0, __v: 0 });
                return { post, likes };
            })
        );

        const postsWithLikesAndComments = await Promise.all(
            postsWithLikes.map(async (postWithLikes) => {
                const comments = await Comment.find({ targetId: postWithLikes.post._id }, { _id: 0, __v: 0 }).populate({ path: 'userId', model: User, select: 'name profilePicture' });
                return { post: postWithLikes.post, likes: postWithLikes.likes, comments };
            })
        );
        result.push(...postsWithLikesAndComments);
        const result1 = shuffleArray(result)
        res.status(200).json(result1);
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
})

router.put('/createpost', async (req, res) => {
    try {
        const { caption, imgUrl, content, targetType, userId } = req.body;
        const post = new Post({ userId: userId, caption: caption, targetType: targetType, imgUrl: imgUrl, content: content })
        post.save()
        res.status(201).json("Success")
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = router;