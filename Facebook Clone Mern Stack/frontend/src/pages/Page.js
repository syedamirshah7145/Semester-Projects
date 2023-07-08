import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';


const Page = () => {
  const [page, setPage] = useState({});
  const [posts, setPosts] = useState([]);
  const [followersCount,setFollowersCount] = useState("");
  const {pageId} = useParams()
  const localData = JSON.parse(localStorage.getItem("user"));
  const userId = localData._id;

  useEffect(() => {
    // Fetch the page data
    const fetchData = async () => {
      try{
        const result = await fetch(`http://localhost:5000/api/page/${pageId}`);
        const json = await result.json();
        setPage(json.pageAndUserDetails[0])
        setPosts(json.result)
      }
      catch(err){
        console.log("error fetching data for page details")
      }
    }

    const countFollowers = async () => {
    try{
      const count = await fetch(`http://localhost:5000/api/followerscount/${pageId}`)
      const json = await count.json()
      setFollowersCount(json)
    }
    catch(err){
      console.log(err)
    }
  }
    fetchData()
    countFollowers()
  }, [followersCount]);

  const handleFollow = async () => {
    try{
      const result = await fetch('http://localhost:5000/api/followers',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ userId:userId,targetId:pageId})
      }
      )
      if(result.status === 201){
        console.log("Added Successfully")
        setFollowersCount(followersCount+1)
      }
      else if(result.status === 400){
        console.log("Follower already exists!")
      }
      else{
        console.log("Internal server error 500")
      }
    }
    catch(err){
      console.log(err);
    }
  }

 
 

  if(!posts || !page){
    return "loading Data"
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img src={page.pictureUrl} className="card-img-top" alt="pagephoto" />
            <div className="card-body">
              <h5 className="card-title">{page.pageName}</h5>
              <p className="card-text">{page.description}</p>
              <button onClick={handleFollow} className="btn btn-primary">Follow {followersCount}</button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {posts.map((post) => (
            <div key={post._id} className="card mb-3">
              <img src={post.post.imgUrl} className="card-img-top" style={{width:"65%"}} alt="hell" />
              <div className="card-body">
                <h5 className="card-title">{post.post.caption}</h5>
                <p className="card-text">{post.post.content}</p>
                <button className="btn btn-primary">Like</button>
                <button className="btn btn-secondary">Comment</button>
                <hr />
                <div>
                  {post.comments.map((comment) => (
                    <div key={comment._id} className="d-flex flex-row mb-2"> <img style={{borderRadius:"50%"}} src={comment.userId.profilePicture} width="60" className="rounded-image" />
                        <div className="d-flex flex-column ml-2"> <span className="name">{comment.userId.name}</span> <small className="comment-text">{comment.content}</small>
                          <div className="d-flex flex-row align-items-center status"> <small>Like</small> <small>Reply</small> <small>Translate</small> <small>{new Date(comment.timestamp).toLocaleString()}</small> </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
