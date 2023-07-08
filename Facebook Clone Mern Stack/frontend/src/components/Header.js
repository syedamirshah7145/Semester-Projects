import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const localData = JSON.parse(localStorage.getItem("user"))
  
  const navigate = useNavigate()
  const navigateToProfile = () => {
    navigate(`/profile/${localData._id}`)
  }

  const navigateToFriends = () => {
    navigate(`/friends/${localData._id}`)
  }

  const navigateToHome = () => {
    navigate(`/home/${localData._id}`)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#">Facebook Clone</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link onClick={navigateToHome}>Home</Nav.Link>
        <Nav.Link onClick={navigateToProfile}>Profile</Nav.Link>
        <Nav.Link onClick={navigateToFriends}>Friends</Nav.Link>
        <Nav.Link href="#">Notifications</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
