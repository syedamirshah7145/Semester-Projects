import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col,Modal,Button,Form } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const PageList = () => {
    const [showEditModal,setshowEditModal] = useState(false)
  const [page, setPage] = useState({});
  const [editProfileData, setEditProfileData] = useState({
    pageName: '',
    description: '',
    pictureUrl:'',
  });
    const [pages, setPages] = useState([]);
    const localData = JSON.parse(localStorage.getItem('user'))
    const userId = localData._id

    useEffect(() => {
        // Fetch all pages from the backend associated with the current user
        const fetchPages = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/pages/${userId}`);
                const data = await response.json();
                setPages(data);
            } catch (error) {
                console.log('Error fetching pages:', error);
            }
        };

        fetchPages();
    }, []);


    const handleCancelEdit = () => {
        setshowEditModal(false)
      }
    
      const handleEditProfile = () => {
        setshowEditModal(true);
        setEditProfileData({
          pageName: page.caption,
          description: page.description,
          pictureUrl: page.pictureUrl
        });
      };
    
      const handleSaveProfile = () => {
        try{
            const performUpdate = async () => {
                const response = await fetch('http://localhost:5000/api/createpage',{
                method : 'PUT',
                headers : {
                  "Content-Type" : "application/json"
                },
                body : JSON.stringify({userId:userId,pageName:editProfileData.pageName,description:editProfileData.description,pictureUrl:editProfileData.pictureUrl})
              })
              const json = await response.json()
              if(json !== "Success"){
                alert("Not created!")
              }
              else{
                alert("Created!")
              }
              }
              performUpdate()
        setshowEditModal(false);
        }
        catch(error) {
            console.log(error)
        }
      }


    const clickOnYourPages = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/pages/${userId}`)
            const json = await response.json()
            setPages(json)
        } catch (err) {
            console.log("error fetching current user page list")
        }
    }

    const clickOnAllPages = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/pages/all')
            const json = await response.json();
            setPages(json)
        }
        catch (err) {
            console.log("error fetching all user page list")
        }
    }

    const clickOnCreatePage = () => {
        setshowEditModal(true)
    }

    return (

        <div>
        <Header />
            <Modal show={showEditModal} onHide={handleCancelEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCaption">
                            <Form.Label>Page Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Page Name"
                                value={editProfileData.pageName}
                                onChange={e => setEditProfileData({ ...editProfileData, pageName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter Description"
                                value={editProfileData.description}
                                onChange={e => setEditProfileData({ ...editProfileData, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImgUrl">
                            <Form.Label>Picture Url</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Enter Picture Url"
                                value={editProfileData.pictureUrl}
                                onChange={e => setEditProfileData({ ...editProfileData, pictureUrl: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveProfile}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Container fluid>
                <Container>
                    <Row>
                        <Col md={10} xs={10}>
                            <div className="container mt-5">
                                <h2>Page List</h2>

                                {pages.length > 0 ? (
                                    <div className="row">
                                        {pages.map((page) => (
                                            <div key={page._id} className="col-md-4 mb-4">
                                                <div className="card">
                                                    <img src={page.pictureUrl} className="card-img-top" alt={page.pageName} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{page.pageName}</h5>
                                                        <p className="card-text">{page.description}</p>
                                                        <p className="card-text">
                                                            <small className="text-muted">Created: {new Date(page.dateCreated).toLocaleDateString()}</small>
                                                        </p>
                                                        <Link to={`/pages/${page._id}`} className="btn btn-primary">View Page</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No pages found.</p>
                                )}
                            </div>
                        </Col>
                        <Col md={2} xs={2}>
                            <div>
                                <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '280px' }}>
                                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                                        <svg className="bi pe-none me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
                                        <span className="fs-4">Sidebar</span>
                                    </a>
                                    <hr />
                                    <ul className="nav nav-pills flex-column mb-auto">
                                        <li style={{ cursor: 'pointer' }} onClick={clickOnYourPages} className="nav-item">
                                            <a className="nav-link" aria-current="page">
                                                Your Pages
                                            </a>
                                        </li>
                                        <li style={{ cursor: 'pointer' }} onClick={clickOnAllPages} className='nav-item'>
                                            <a className="nav-link link-body-emphasis">
                                                All Pages
                                            </a>
                                        </li>
                                        <li style={{ cursor: 'pointer' }} onClick={clickOnCreatePage} className='nav-item'>
                                            <a className="nav-link link-body-emphasis">
                                                Create Page
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footer />
        </div>
    );
};

export default PageList;
