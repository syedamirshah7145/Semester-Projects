const mongoose = require('mongoose');
const User = require('./models/User')
const Post = require('./models/Post')
const Page = require('./models/Page');
const Message = require('./models/Message');

const mongoUrl = 'mongodb://Social:resume@ac-w897h79-shard-00-00.rvmxeka.mongodb.net:27017,ac-w897h79-shard-00-01.rvmxeka.mongodb.net:27017,ac-w897h79-shard-00-02.rvmxeka.mongodb.net:27017/facebookclone?ssl=true&replicaSet=atlas-hwwfr9-shard-0&authSource=admin&retryWrites=true&w=majority'

const mongoDb = async () => { await mongoose
    .connect(mongoUrl,{useNewUrlParser: true})
    .then(async () => {
        console.log("Connected To Database")
        // const messages = [
        //   {
        //     senderId: '6477e6635150a44f204a6675',
        //     receiverId: '6477f55f822c4eb5b392f75a',
        //     content: 'Hello',
        //   },
        //   {
        //     senderId: '6477f55f822c4eb5b392f75a',
        //     receiverId: '6477e6635150a44f204a6675',
        //     content: 'Hi there',
        //   },
        //   {
        //     senderId: '6477e6635150a44f204a6675',
        //     receiverId: '6477f55f822c4eb5b392f75a',
        //     content: 'How are you?',
        //   },
        //   {
        //     senderId: '6477f55f822c4eb5b392f75a',
        //     receiverId: '6477e6635150a44f204a6675',
        //     content: 'I\'m good, thanks!',
        //   },
        //   {
        //     senderId: '6477e6635150a44f204a6675',
        //     receiverId: '6477f55f822c4eb5b392f75a',
        //     content: 'That\'s great!',
        //   },
        //   {
        //     senderId: '6477f55f822c4eb5b392f75a',
        //     receiverId: '6477e6635150a44f204a6675',
        //     content: 'What have you been up to?',
        //   },
        //   {
        //     senderId: '6477e6635150a44f204a6675',
        //     receiverId: '6477f55f822c4eb5b392f75a',
        //     content: 'Not much, just working on a project',
        //   },
        //   {
        //     senderId: '6477f55f822c4eb5b392f75a',
        //     receiverId: '6477e6635150a44f204a6675',
        //     content: 'That sounds interesting!',
        //   },
        //   {
        //     senderId: '6477e6635150a44f204a6675',
        //     receiverId: '6477f55f822c4eb5b392f75a',
        //     content: 'Yeah, it\'s been keeping me busy',
        //   },
        //   {
        //     senderId: '6477f55f822c4eb5b392f75a',
        //     receiverId: '6477e6635150a44f204a6675',
        //     content: 'Do you need any help with it?',
        //   },
        //   {
        //     senderId: '6477e6635150a44f204a6675',
        //     receiverId: '6477f55f822c4eb5b392f75a',
        //     content: 'Thanks for offering, but I think I\'ve got it under control',
        //   },
        //   {
        //     senderId: '6477f55f822c4eb5b392f75a',
        //     receiverId: '6477e6635150a44f204a6675',
        //     content: 'Alright, let me know if you change your mind',
        //   },
        //   {
        //     senderId: '6477e6635150a44f204a6675',
        //     receiverId: '6477f55f822c4eb5b392f75a',
        //     content: 'Sure, thanks!',
        //   },
        //   {
        //     senderId: '6477f55f822c4eb5b392f75a',
        //     receiverId: '6477e6635150a44f204a6675',
        //     content: 'No problem!',
        //   },
        //   {
        //     senderId: '6477e6635150a44f204a6675',
        //     receiverId: '6477f55f822c4eb5b392f75a',
        //     content: 'Bye for now',
        //   },
        //   {
        //     senderId: '6477f55f822c4eb5b392f75a',
        //     receiverId: '6477e6635150a44f204a6675',
        //     content: 'Goodbye, take care!',
        //   },
        // ];

        // Message.insertMany(messages).then(() => {
        //   console.log("Inserted!")
        // })
        // Page.updateMany({},{userId:"6477e6635150a44f204a6675"}).then(() => {
        //   console.log("updated Successfull")
        // })

        // Post.deleteMany({}).then(() => {
        //     console.log("deleted!")
        // })

        // Page.deleteMany({}).then(() => {
        //   console.log("deleted Successfully")
        // })
        // Page.insertMany({userId:'6477e6635150a44f204a6675',pageName:'Nyctophile',description:'Posts about nyctophilia',pictureUrl:'https://picsum.photos/1000'}).then(() => {console.log("added Successfully")})

// Assuming you have the userId and the pageId
// const userId = "6477e6635150a44f204a6675";
// const pageId = "6480ca9e25bf9737d5f2aeec";

// const updatePosts = async () => {
//   try {
//     const posts1 = await Post.find({ userId });

//     // Update each post with the pageId
//     await Promise.all(
//       posts1.map(async (post) => {
//         post.pageId = pageId;
//         await post.save();
//       })
//     );

//     console.log("Posts updated successfully!");
//   } catch (error) {
//     console.error("Error updating posts:", error);
//   }
// };

// updatePosts();
// Post.updateMany({userId:userId},{targetType:'pagePosts',targetId:pageId}).then(() => {
//   console.log("updated Successfully")
// })
// Post.updateMany({userId:userId},{targetId:pageId})
// const userId = "6477e6635150a44f204a6675";
// User.updateOne({_id:"6477e6635150a44f204a6675"},{profilePicture:`https://i.pravatar.cc/150?u=${userId}`}).then(() => {
//   console.log("success")
// })

// const users = await User.find({});
//   const userId = users[11]._id;
//   User.updateOne({_id:userId},{profilePicture:`https://i.pravatar.cc/150?u=${userId}`}).then(() => {
//   console.log("success")
//     })
        const posts = [
            {
              userId: '6477e6635150a44f204a6675',
              caption: 'Post 1',
              imgUrl: 'https://example.com/image1.jpg',
              content: 'This is the content of post 1'
            },
            {
              userId: '6477f55f822c4eb5b392f75a',
              caption: 'Post 2',
              imgUrl: 'https://example.com/image2.jpg',
              content: 'This is the content of post 2'
            },
            {
              userId: '6477f55f822c4eb5b392f75b',
              caption: 'Post 3',
              imgUrl: 'https://example.com/image3.jpg',
              content: 'This is the content of post 3'
            },
            {
              userId: '6477f55f822c4eb5b392f75c',
              caption: 'Post 4',
              imgUrl: 'https://example.com/image4.jpg',
              content: 'This is the content of post 4'
            },
            {
              userId: '6477f55f822c4eb5b392f75d',
              caption: 'Post 5',
              imgUrl: 'https://example.com/image5.jpg',
              content: 'This is the content of post 5'
            },
            {
              userId: '6477f55f822c4eb5b392f759',
              caption: 'Post 6',
              imgUrl: 'https://example.com/image6.jpg',
              content: 'This is the content of post 6'
            },
            {
              userId: '6477f55f822c4eb5b392f75f',
              caption: 'Post 7',
              imgUrl: 'https://example.com/image7.jpg',
              content: 'This is the content of post 7'
            },
            {
              userId: '6477f55f822c4eb5b392f758',
              caption: 'Post 8',
              imgUrl: 'https://example.com/image8.jpg',
              content: 'This is the content of post 8'
            },
            {
              userId: '6477f55f822c4eb5b392f761',
              caption: 'Post 9',
              imgUrl: 'https://example.com/image9.jpg',
              content: 'This is the content of post 9'
            },
            {
              userId: '6477f55f822c4eb5b392f760',
              caption: 'Post 10',
              imgUrl: 'https://example.com/image10.jpg',
              content: 'This is the content of post 10'
            },
            {
              userId: '6477f55f822c4eb5b392f75e',
              caption: 'Post 11',
              imgUrl: 'https://example.com/image11.jpg',
              content: 'This is the content of post 11'
            }
          ];


          const userIds = [
            '6477e6635150a44f204a6675',
            '6477f55f822c4eb5b392f75a',
            '6477f55f822c4eb5b392f75b',
            '6477f55f822c4eb5b392f75c',
            '6477f55f822c4eb5b392f75d',
            '6477f55f822c4eb5b392f759',
            '6477f55f822c4eb5b392f75f',
            '6477f55f822c4eb5b392f758',
            '6477f55f822c4eb5b392f761',
            '6477f55f822c4eb5b392f760',
            '6477f55f822c4eb5b392f75e'
          ];
          
          // Post IDs
          const postIds = [
            "647da1937a1ffd571114b983",
            "647da1937a1ffd571114b984",
            "647da1937a1ffd571114b985",
            "647da1937a1ffd571114b986",
            "647da1937a1ffd571114b987",
            "647da1937a1ffd571114b988",
            "647da1937a1ffd571114b989",
            "647da1937a1ffd571114b98a",
            "647da1937a1ffd571114b98b",
            "647da1937a1ffd571114b98c",
            "647da1937a1ffd571114b98d",
            "647da7d592def5e60ab2d9b2",
            "647da7d592def5e60ab2d9b3",
            "647da7d592def5e60ab2d9b4",
            "647da7d592def5e60ab2d9b5",
            "647da7d592def5e60ab2d9b8",
            "647da7d592def5e60ab2d9b9",
            "647da7d592def5e60ab2d9ba",
            "647da7d592def5e60ab2d9bb",
            "647da7d592def5e60ab2d9bc",
            "647da7d592def5e60ab2d9bd",
            "647da7d592def5e60ab2d9be",
            "647da7d592def5e60ab2d9c0",
            "647da7d592def5e60ab2d9bf",
            "647da7d592def5e60ab2d9c1",
            "647da7d592def5e60ab2d9c2",
            "647da7d592def5e60ab2d9c3",
            "647da7d592def5e60ab2d9c4",
            "647da7d592def5e60ab2d9b6",
            "647da7d592def5e60ab2d9b7",
            "647da7d592def5e60ab2d9c7",
            "647da7d592def5e60ab2d9c8",
            "647da7d592def5e60ab2d9c9",
            "647da7d592def5e60ab2d9ca",
            "647da7d592def5e60ab2d9cb",
            "647da7d592def5e60ab2d9cc",
            "647da7d592def5e60ab2d9cd",
            "647da7d592def5e60ab2d9ce",
            "647da7d592def5e60ab2d9cf",
            "647da7d592def5e60ab2d9d1",
            "647da7d592def5e60ab2d9d2",
            "647da7d592def5e60ab2d9d0",
            "647da7d592def5e60ab2d9d3",
            "647da7d592def5e60ab2d9d4",
            "647da7d592def5e60ab2d9d5",
            "647da7d592def5e60ab2d9d6",
            "647da7d592def5e60ab2d9d7",
            "647da7d592def5e60ab2d9d8",
            "647da7d592def5e60ab2d9d9",
            "647da7d592def5e60ab2d9da",
            "647da7d592def5e60ab2d9dc",
            "647da7d592def5e60ab2d9db",
            "647da7d592def5e60ab2d9c5",
            "647da7d592def5e60ab2d9c6",
            "647da7d592def5e60ab2d9df",
            "647da7d592def5e60ab2d9e0",
            "647da7d592def5e60ab2d9e1",
            "647da7d592def5e60ab2d9e2",
            "647da7d592def5e60ab2d9e3",
            "647da7d592def5e60ab2d9e5",
            "647da7d592def5e60ab2d9e4",
            "647da7d592def5e60ab2d9e6",
            "647da7d592def5e60ab2d9e7",
            "647da7d592def5e60ab2d9e8",
            "647da7d592def5e60ab2d9e9",
            "647da7d592def5e60ab2d9ea",
            "647da7d592def5e60ab2d9ec",
            "647da7d592def5e60ab2d9eb",
            "647da7d592def5e60ab2d9ed",
            "647da7d592def5e60ab2d9f0",
            "647da7d592def5e60ab2d9ef",
            "647da7d592def5e60ab2d9ee",
            "647da7d592def5e60ab2d9f1",
            "647da7d592def5e60ab2d9f2",
            "647da7d592def5e60ab2d9f3",
            "647da7d592def5e60ab2d9f4",
            "647da7d592def5e60ab2d9f5",
            "647da7d592def5e60ab2d9f6",
            "647da7d592def5e60ab2d9f7",
            "647da7d592def5e60ab2d9f8",
            "647da7d592def5e60ab2d9f9",
            "647da7d592def5e60ab2d9fa",
            "647da7d592def5e60ab2d9fb",
            "647da7d592def5e60ab2d9fc",
            "647da7d592def5e60ab2d9fd",
            "647da7d592def5e60ab2d9fe",
            "647da7d592def5e60ab2d9ff",
            "647da7d592def5e60ab2da00",
            "647da7d592def5e60ab2da01",
            "647da7d592def5e60ab2da02",
            "647da7d592def5e60ab2da03",
            "647da7d592def5e60ab2da05",
            "647da7d592def5e60ab2da04",
            "647da7d592def5e60ab2da06",
            "647da7d592def5e60ab2d9de",
            "647da7d592def5e60ab2d9dd",
            "647da7d592def5e60ab2da0a",
            "647da7d592def5e60ab2da09",
            "647da7d592def5e60ab2da0c",
            "647da7d592def5e60ab2da0b",
            "647da7d592def5e60ab2da0d",
            "647da7d592def5e60ab2da0e",
            "647da7d592def5e60ab2da0f",
            "647da7d592def5e60ab2da10",
            "647da7d592def5e60ab2da11",
            "647da7d592def5e60ab2da12",
            "647da7d592def5e60ab2da13",
            "647da7d592def5e60ab2da14",
            "647da7d592def5e60ab2da15",
            "647da7d592def5e60ab2da07",
            "647da7d592def5e60ab2da08"
          ];
          
        //   Function to generate a random user ID
          function getRandomUserId() {
            const randomIndex = Math.floor(Math.random() * userIds.length);
            return userIds[randomIndex];
          }
          
          // Function to generate a random post ID
          function getRandomPostId() {
            const randomIndex = Math.floor(Math.random() * postIds.length);
            return postIds[randomIndex];
          }

        //   for (let i = 1; i <= 250; i++) {
        //     const comment = new Comment({
        //       userId: getRandomUserId(),
        //       targetId: getRandomPostId(),
        //       targetType:'post',
        //       content: `This is comment number ${i}`
        //     });
        //     comment.save()
        //       .then(() => console.log('Comment added:', comment))
        //       .catch(error => console.log('Error adding comment:', error));
        //   }
          
        //   // Add 15 likes
        //   for (let i = 1; i <= 250; i++) {
        //     const like = new Like({
        //       userId: getRandomUserId(),
        //       targetType: 'post',
        //       targetId: getRandomPostId()
        //     });
        //     like.save()
        //       .then(() => console.log('Like added:', like))
        //       .catch(error => console.log('Error adding like:', error));
        //   }

        
    })
    .catch((err) => { console.log(err) })}

module.exports = mongoDb;