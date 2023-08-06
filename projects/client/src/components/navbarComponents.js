import React from "react";
import {Nav, Navbar, NavDropdown, Container} from 'react-bootstrap';

const NavbarComponents = () => {
  return(
    <Navbar expand="sm" data-bs-theme="dark" >
      <Container fluid>
        <Navbar.Brand href="#">Kasir<strong> Qyuu</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponents;