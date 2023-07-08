import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    console.log('NewsFeed component mounted'); // Add this console.log statement

    const fetchData = async () => {
      try {
        const result = await fetch(`http://localhost:5000/api/posts/profile/${userId}`);
        const json = await result.json();
        setPosts(json);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  if (!posts) return 'loading...';

  return (
    <div>
      <div className="container mt-5 mb-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6">
          {posts.length > 0 && 
            posts.map(post => (
              <div className="card">
                <div className="d-flex justify-content-between p-2 px-3">
                  <div className="d-flex flex-row align-items-center"> <img src={post.post.userId.profilePicture} width="50" className="rounded-circle" />
                    <div className="d-flex flex-column ml-2"> <span className="font-weight-bold">{post.post.userId.name}</span> <small className="text-primary">{post.post.caption}</small> </div>
                  </div>
                  <div className="d-flex flex-row mt-1 ellipsis"> <small className="mr-2">{post.post.timestamp}</small> <i className="fa fa-ellipsis-h"></i> </div>
                </div> <img src={post.post.imgUrl} className="img-fluid" />
                <div className="p-2">
                  <p className="text-justify">{post.post.content}</p>
                  <hr />


                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-row icons d-flex align-items-center"> <i className="fa fa-heart"></i> <i className="fa fa-smile-o ml-2"></i> </div>
                    <div className="d-flex flex-row muted-color"> <span>i</span> <span className="ml-2">Share</span> </div>
                  </div>
                  <hr />


                  <div className="comments">

                    {post.comments.map(comment => (
                      <div className="d-flex flex-row mb-2"> <img src={comment.userId.profilePicture} width="40" className="rounded-image" />
                        <div className="d-flex flex-column ml-2"> <span className="name">{comment.userId.name}</span> <small className="comment-text">{comment.content}</small>
                          <div className="d-flex flex-row align-items-center status"> <small>Like</small> <small>Reply</small> <small>Translate</small> <small>{comment.timestamp}</small> </div>
                        </div>
                      </div>
                    ))
                    }

                    <div className="d-flex flex-row mb-2"> <img src="https://i.imgur.com/1YrCKa1.jpg" width="40" className="rounded-image" />
                      <div className="d-flex flex-column ml-2"> <span className="name">Elizabeth goodmen</span> <small className="comment-text">Thanks for sharing!</small>
                        <div className="d-flex flex-row align-items-center status"> <small>Like</small> <small>Reply</small> <small>Translate</small> <small>8 mins</small> </div>
                      </div>
                    </div>
                    <div className="comment-input"> <input type="text" className="form-control" />
                      <div className="fonts"> <i className="fa fa-camera"></i> </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
            


          </div>
        </div>
      </div>

    </div>



  );
};

export default NewsFeed;
