import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { json, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const People = () => {
  const navigate = useNavigate();
  const localData = JSON.parse(localStorage.getItem("user"))
  const userId = localData._id;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch friends data from the backend API
    // Update the 'friends' state with the fetched data
    // Example:

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getusers");
        const json = await response.json()
        setUsers(json)
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
          body : JSON.stringify({userId : userId,friendId : currentFriendId})
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

  if(!users) return "Loading"

  return (
    <div>
    <Header />
    <Container>
      <h2>All Users</h2>
      <Row>
        {users.length > 0 && users.map(user => (
          <Col style={{cursor:"pointer"}} key={user._id} md={4} className="mb-4">
            <Card>
              <Card.Body onClick={() => {handleClick(user._id)}}>
              <Card.Img className='img-fluid' style={{maxWidth:"100",height:"auto"}} variant="top" src="https://picsum.photos/800" alt={user.name} />
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle>{user.location}</Card.Subtitle>
                <Card.Link>{user.email}</Card.Link>
                <Card.Text>
                 {user.bio}
                </Card.Text>
              </Card.Body>
              <Button onClick={() => {handleAddFriend(user._id)}}>Add Friend</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <Footer />
    </div>
  );
};

export default People;
