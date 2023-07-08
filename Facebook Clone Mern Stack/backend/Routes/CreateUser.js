const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

router.post('/createuser', [
    body('email', "invalid email").isEmail(),
    body('password', "Password must be atleast 5 characters long").isLength({ min: 5 }),
    body('name', "name must be atleast of length 5").isLength({ min: 5 })
]
    , async (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            try {
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    location: req.body.location,
                    bio:req.body.bio
                });
                res.status(200).json({ success: true })
            } catch (error) {
                console.log(error)
                res.json({ success: false })
            }
        }
        else{
            return res.status(400).json({ errors: result.array() });
        }
        
});

module.exports = router;