import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import NewsFeed from '../components/NewsFeed';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';




const Home = () => {

  return (
    <Container fluid>
      <Header />
      <Container>
        <Row>
          <Col md={10} xs={10}>
            <NewsFeed />
          </Col>
          <Col md={2} xs={2}>
            <SideBar />
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
};

export default Home;
