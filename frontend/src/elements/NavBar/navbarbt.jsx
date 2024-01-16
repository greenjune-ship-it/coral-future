import React,  { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import {jwtDecode} from 'jwt-decode';
import './navbar.css'
function NavBarbt() {
   let {logoutUser } = useContext(AuthContext) 
   let [user] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    return (
      <>
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Link to='/' className="link-class">
              <Navbar.Brand >Navbar</Navbar.Brand>
            </Link>
            <Nav className="me-auto">
              <Nav.Link href="#map">Map</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#aboutus">About Us</Nav.Link>
              <Nav.Link href="#gethelp">Get Help</Nav.Link>
              </Nav>
              { user ? (<Nav className="mr-auto" onClick={logoutUser}>
                <Button variant="primary">Log Out</Button>{' '}
              </Nav>)
              :
              (<Nav className="mr-auto" >
              <Link to='/signin' className="link-class">
                  <Button variant="primary">Log In</Button>{' '}
              </Link>
            </Nav> )}
          </Container>
        </Navbar>
      </>
      
    );

    /* <>
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Link to='/' className="link-class">
              <Navbar.Brand >Navbar</Navbar.Brand>
            </Link>
            <Nav className="me-auto">
              <Nav.Link href="#map">Map</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#aboutus">About Us</Nav.Link>
              <Nav.Link href="#gethelp">Get Help</Nav.Link>
              </Nav>
              {user ? (
                <Nav className="mr-auto" onClick={logoutUser}>
                <Link to='/profile' className="link-class">
                    
                </Link>
              </Nav>
              
              ):
            (
              <Nav className="mr-auto" >
              <Link to='/signin' className="link-class">
                  <Button variant="primary">Log In</Button>{' '}
              </Link>
            </Nav> 
            )}
          </Container>
        </Navbar>
      </> */
  }
  
  export default NavBarbt;