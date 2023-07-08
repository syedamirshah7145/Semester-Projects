// Assuming you have an Express server set up

const express = require('express');
const router = express.Router();
const User = require("../models/User")

// API endpoint to get list of friends for a user
router.get('/friends/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by their ID and get their friends
    const user = await User.findById(userId).select('friends');
    const friendIds = user.friends.map(friend => friend.friendId);

    // Fetch all data of each friend using their IDs
    const friends = await Promise.all(friendIds.map(async (friendId) => {
      const friend = await User.findById(friendId).select('name email location bio profilePicture');
      return friend;
    }));

    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/addfriend', async (req,res) => {
  try {
    // Get the user ID from the request body
    const userId = req.body.userId;
    const friendId = req.body.friendId;

    const user = await User.findOne({ _id: userId, 'friends.friendId': friendId });

    if (user) {
      // If the friend already exists, handle the error accordingly
      return res.status(400).json({ error: 'Friend already exists' });
    }

    // Create a new friend object
    const newFriend = {
      friendId: req.body.friendId,
      status: "accepted"
    };

    // Find the user by its ID and update the friends array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: newFriend } },
      { new: true }
    );

    if (!updatedUser) {
      // If the user doesn't exist, handle the error accordingly
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
})

module.exports = router;
