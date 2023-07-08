import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { json, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Friends = () => {
  const navigate = useNavigate();
  const { userid } = useParams();

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Fetch friends data from the backend API
    // Update the 'friends' state with the fetched data
    // Example:

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/friends/${userid}`);
        const json = await response.json()
        setFriends(json.friends)
      }
      catch(error){
        console.log("Error fetching friends data",error)
      }
    }
    fetchUserData();
    
  }, []);

  const handleClick = (id) => {
    console.log(id)
    navigate(`/profile/${id}`)
  }

  const handleAddFriend = (currentFriendId) => {
    const addFriend = async () => {
      try{
        const response = await fetch('http://localhost:5000/api/addfriend',{
          method: "POST",
          headers : {
            "Content-Type" : 'application/json'
          },
          body : JSON.stringify({userId : userid,friendId : currentFriendId})
        })
        if(response.status == 200){
          alert("Added Successfully!")
        }
        else if(response.status == 400){
          alert("Already Friend")
        }
        else{
          alert("Server Error")
        }
      }
      catch(error) {
        console.log(error)
      }
    }
    addFriend()
  }

  return (
    <div>
    <Header />
    <Container>
      <h2>Friends</h2>
      <Row>
        {friends.map(friend => (
          <Col style={{cursor:"pointer"}} key={friend._id} md={4} className="mb-4">
            <Card>
              <Card.Body onClick={() => {handleClick(friend._id)}}>
              <Card.Img className='img-fluid' style={{maxWidth:"100",height:"auto"}} variant="top" src="https://picsum.photos/800" alt={friend.name} />
                <Card.Title>{friend.name}</Card.Title>
                <Card.Subtitle>{friend.location}</Card.Subtitle>
                <Card.Link>{friend.email}</Card.Link>
                <Card.Text>
                 {friend.bio}
                </Card.Text>
              </Card.Body>
              <Button onClick={() => {handleAddFriend(friend._id)}}>Add Friend</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <Footer />
    </div>
  );
};

export default Friends;
