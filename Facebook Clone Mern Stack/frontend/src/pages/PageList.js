import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PageList from '../components/PageList';




const Page = () => {

  const navigate = useNavigate();
  const localData = JSON.parse(localStorage.getItem("user"))
  const userId = localData._id;
   // Replace with the actual userId you have

//   useEffect(() => {
//     navigate(`/home/${userId}`);
//   }, [navigate, userId]);

  return (
    <Container fluid>
      <PageList />
    </Container>
  );
};

export default Page;
