const express = require('express')
const Follower = require('../models/Follower')
const router = express.Router()

router.post('/followers', async (req, res) => {
    const targetId = req.body.targetId
    const userId = req.body.userId
    try {
        const existingFollower = await Follower.findOne({ userId: userId, targetId: targetId })
        if (existingFollower) {
            res.status(400).json({ message: "Follower already exist" })
        }
        else {
            const follower = new Follower({ userId: userId, targetId: targetId, targetType: "page" })
            follower.save()
            res.status(201).json({ message: "follower added successfully", follower: follower })
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
})

router.get('/followerscount/:targetId',async (req,res) => {
    const targetId = req.params.targetId;
    try{
        const count = await Follower.count(targetId);
        res.status(200).json(count)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;