const express = require('express');
const User = require('../models/User');

const router = express.Router()

router.get("/getusers", async (req,res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json(error)
    }
})



module.exports = router;