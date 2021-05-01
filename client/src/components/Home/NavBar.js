import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const NavBar = ({ auth: { isAuthenticated }, logout }) => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='mb-5'>
      {isAuthenticated ? (
        <>
          <Navbar.Brand href='/chat'>Web Chat Application</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : (
        <>
          <Navbar.Brand href='/'>Web Chat Application</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/login'>Login</Nav.Link>
              <Nav.Link href='/register'>Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
