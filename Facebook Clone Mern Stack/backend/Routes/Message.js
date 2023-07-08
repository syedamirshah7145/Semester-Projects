const express = require('express');
const router = express.Router();
const Message = require('../models/Message')
const User = require("../models/User")

// Get conversation between two users
router.get('/conversation/:senderId/:receiverId', async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;

        // Find messages where the sender and receiver IDs match
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ timestamp: 1 }).populate({
            path: 'senderId',
            model: User,
            select: 'name profilePicture',
        }); // Sort messages by timestamp in ascending order

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the conversation.' });
    }
});

router.post('/createmessage', async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;
        const message = new Message({ senderId: senderId, receiverId: receiverId, content: content })
        message.save()
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).populate({
            path: 'senderId',
            model: User,
            select: 'name profilePicture',
        });
        res.status(201).json(messages)
    }
    catch (error) {
        res.status(500).json({error:error})
    }
})

module.exports = router;
