const express = require('express');
const router = express.Router();
const Page = require('../models/Page')
const User = require('../models/User')
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment')

router.get('/page/:pageId', async (req,res) => {
    const result = [];
    try{
        const pageId = req.params.pageId
        const pageAndUserDetails = await Page.find({_id:pageId}).populate({path:'userId',model:User,select:'name profilePicture'})
        const posts = await Post.find({targetId:pageId})
        

        const postsWithLikes = await Promise.all(
            posts.map(async (post) => {
                const likes = await Like.find({ targetId: post._id },{_id:0,timestamp:0,__v:0});
                return { post, likes };
            })
        );
        

        const postsWithLikesAndComments = await Promise.all(
            postsWithLikes.map(async (postWithLikes) => {
                const comments = await Comment.find({ targetId: postWithLikes.post._id },{_id:0,__v:0}).populate({path: 'userId',model: User,select:'name profilePicture'});
                return { post: postWithLikes.post, likes: postWithLikes.likes, comments };
            })
        );
        
        result.push(...postsWithLikesAndComments);
        res.status(200).json({pageAndUserDetails,result})
    }
    catch(error){
        res.status(500).json({error:error})
    }
})

router.get('/pages/all',async (req,res) => {
    try{
        const pages = await Page.find({})
        res.status(200).json(pages)
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

router.get('/pages/:userId',async (req,res) => {
    try{
        const userId = req.params.userId;
        const pages = await Page.find({userId:userId})
        res.status(200).json(pages)
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

router.put('/createpage',async (req,res) => {
    try{
        const {userId,pageName,description,pictureUrl} = req.body;
        const page = new Page({userId:userId,pageName:pageName,pictureUrl:pictureUrl,description:description})
        page.save()
        res.status(201).json("Success")
    }
    catch(err){
        res.status(500).json({error:err})
    }
})

module.exports = router;