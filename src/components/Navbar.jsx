 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom"
import SideBar from './SideBar';
import { useState } from 'react';

 const NavBar = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return( 
      <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Ecommerce</Navbar.Brand>
          <Nav className="me-auto">             
            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
            <Nav.Link as={Link}to= "/product/:id">Product Detail</Nav.Link>
            <Nav.Link as={Link} to="/Purchased">Purchased</Nav.Link>
            <Nav.Link onClick={handleShow}>Purchased(sidebar)</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>
      <SideBar show={show}
      handleClose={handleClose} 
      handleShow={handleShow}/>      
      </>
        )
}
export default NavBar