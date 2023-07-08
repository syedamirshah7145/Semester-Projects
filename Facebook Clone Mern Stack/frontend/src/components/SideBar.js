import React,{useState} from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  let navigate = useNavigate()

  const localData = JSON.parse(localStorage.getItem('user'))
  const userId = localData._id;
  
  const [showEditModal,setshowEditModal] = useState(false)
  const [post, setPost] = useState({});
  const [editProfileData, setEditProfileData] = useState({
    content: '',
    caption: '',
    imgUrl:'',
  });
  const handleCreatePost = () => {
    setshowEditModal(true)
  }

  const handleCancelEdit = () => {
    setshowEditModal(false)
  }

  const handleEditProfile = () => {
    setshowEditModal(true);
    setEditProfileData({
      content: post.caption,
      caption: post.content,
      imgUrl: post.imgUrl
    });
  };

  const handleSaveProfile = () => {
    const performUpdate = async () => {
      const response = await fetch('http://localhost:5000/api/createpost',{
      method : 'PUT',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({targetType:"userpost",userId:userId,caption:editProfileData.caption,content:editProfileData.content,imgUrl:editProfileData.imgUrl})
    })
    const json = await response.json()
    if(response.status != 201){
      alert("Not created!")
    }
    else{
      alert("Created!")
    }
    }

    performUpdate()
    setshowEditModal(false);
  }

  const handlePeople = () => {
    navigate("/people")
  }

  const handleMessage = () => {
    navigate('/message')
  }
  
  return (
    <div>
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: '280px'}}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <svg className="bi pe-none me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
      <span className="fs-4">Sidebar</span>
    </a>
    <hr />
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <a href="/pages" style={{cursor:"pointer"}} className="nav-link link-body-emphasis" aria-current="page">
          Page
        </a>
      </li>
      <li>
        <a onClick={handleCreatePost} style={{cursor:"pointer"}} className="nav-link link-body-emphasis">
          Create Post
        </a>
      </li>
      <li>
        <a onClick={handlePeople} style={{cursor:"pointer"}} className="nav-link link-body-emphasis">
          People
        </a>
      </li>
      <li>
        <a onClick={handleMessage} href="#" style={{cursor:"pointer"}} className="nav-link link-body-emphasis">
          Message
        </a>
      </li>
    </ul>
    <hr />
    <div className="dropdown">
      <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
        <strong>mdo</strong>
      </a>
      <ul className="dropdown-menu text-small shadow">
        <li><a className="dropdown-item" href="#">New project...</a></li>
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>

  <Modal show={showEditModal} onHide={handleCancelEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCaption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Caption"
              value={editProfileData.caption}
              onChange={e => setEditProfileData({ ...editProfileData, caption: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Content"
              value={editProfileData.content}
              onChange={e => setEditProfileData({ ...editProfileData, content: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formImgUrl">
            <Form.Label>Img Url</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter imgUrl"
              value={editProfileData.imgUrl}
              onChange={e => setEditProfileData({ ...editProfileData, imgUrl: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
        <Button variant="primary" onClick={handleSaveProfile}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  </div>
  )
};

export default SideBar;
