import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
// import PropTypes from 'prop-types'

const Home = (props) => {
  return (
    <div>
      <Container>
        <h1 className="mt-5 mb-3">Welcome to Web Chat Application</h1>
        <p className="subheadline mb-5">
          You can chat with anyone register with this chat application & you can
          also chat in rooms. If you already have an account then login to start
          chatting otherwise register to enjoy using chat application.
        </p>
        <Row>
          <Col>
            <Link to="/login">
              <Button className="btn" style={{ float: "right" }} variant="dark">
                Login
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/register">
              <Button className="btn" variant="outline-dark">
                Register
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Home.propTypes = {

// }

export default Home;
