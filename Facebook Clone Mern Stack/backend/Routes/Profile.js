const express = require('express');
const User = require('../models/User');

const router = express.Router()

router.get('/profile/:userId', async (req,res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({error:'Profile not found!'})
        }

        const {name,email,location,bio} = user;

        const profile = {
            name,
            email,
            bio,
            location
        }
        res.json(profile)
    }

    catch(error){
        return res.status(500).json({error:error})
    }    
})

router.put('/profile/:userId', async (req,res) => {
    const { userId } = req.params;
    const {name, bio, location, profilePic} = req.body;

    try {
        await User.findOneAndUpdate({_id:userId},{name:name,location:location,bio:bio,profilePic:profilePic})
        return res.status(200).json({success:true})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({error:err})
    }
})

module.exports = router;