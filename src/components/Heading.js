import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Heading = () => {
  return (
    <div>
      <Navbar bg="dark" variant='dark' expand="lg">
        <Container>
          <Navbar.Brand href="#home">bookstore</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Heading;
