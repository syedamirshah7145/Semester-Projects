const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator')

router.post('/loginuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }
        try{
            let userData = await User.findOne({ email: req.body.email });
            if (!userData) {
                return res.status(400).json("Enter correct email password");
            }

            if(req.body.password !== userData.password){
                return res.status(400).json("Enter correct email or password");
            }
                return res.json({success:true,userData})
        }
        catch(error){
            console.log(error)
            res.json({success:false})
        }
    });

module.exports = router;