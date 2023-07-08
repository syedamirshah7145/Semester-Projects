import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';
import CurrentPosts from '../components/CurrentPosts';


const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProfileData, setEditProfileData] = useState({
    name: '',
    bio: '',
    location:'',
    profilePicture: '',
  });
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
        const data = await response.json();
        console.log(data)
        setUser({
          name: data.name,
          bio: data.bio,
          location:data.location,
          profilePicture: "https://picsum.photos/1500",
          posts: [
            { id: 1, content: 'First post' },
            { id: 2, content: 'Second post' },
            // ...
          ],
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    // Fetch user data from the backend API
    // Update the 'user' state with the fetched data
    // Example:
    fetchUserData()

  }, []);

  const handleEditProfile = () => {
    setShowEditModal(true);
    setEditProfileData({
      name: user.name,
      bio: user.bio,
      location: user.location,
      profilePicture: user.profilePicture,
    });
  };

  const handleSaveProfile = () => {
    const performUpdate = async (req,res) => {
      const response = await fetch(`http://localhost:5000/api/profile/${userId}`,{
        method : "PUT",
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name:editProfileData.name,bio:editProfileData.bio,location:editProfileData.location,profilePicture:editProfileData.profilePicture})
      })

      const json = await response.json();

      if(!json.success){
        alert("Update not completed succesfully!")
      }
      else{
        alert("Updated Successfully")
      }
    }

    performUpdate()
    // Perform API call to update the user profile
    // Example:
    // const updatedProfileData = { name, bio, profilePicture };
    // API.updateProfile(updatedProfileData)
    //   .then(response => {
    //     // Handle successful update
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });

    // For the sake of this example, we'll update the state directly
    setUser({
      ...user,
      name: editProfileData.name,
      bio: editProfileData.bio,
      location:user.location,
      profilePicture: editProfileData.profilePicture,
    });

    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <div>
    <Header />
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Img style={{ width: "200px", height: "200px", borderRadius: "50%" }} variant="top" src={user.profilePicture} alt="Profile Picture" />
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>{user.bio}</Card.Text>
              <Card.Text>{user.location}</Card.Text>
              <Button variant="primary" onClick={handleEditProfile}>Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
        <CurrentPosts />
        </Col>

      </Row>
      <Modal show={showEditModal} onHide={handleCancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={editProfileData.name}
                onChange={e => setEditProfileData({ ...editProfileData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your bio"
                value={editProfileData.bio}
                onChange={e => setEditProfileData({ ...editProfileData, bio: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter your Location"
                value={editProfileData.location}
                onChange={e => setEditProfileData({ ...editProfileData, location: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProfilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the URL of your profile picture"
                value={editProfileData.profilePicture}
                onChange={e => setEditProfileData({ ...editProfileData, profilePicture: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveProfile}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    <Footer />
    </div>
  );
};

export default Profile;
