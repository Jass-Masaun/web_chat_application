import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import Alert from "../Alert";

// Import Components
import PropTypes from "prop-types";
import Input from "../Chat/Input/Input";

const Login = ({ loginUser, auth: { isAuthenticated } }) => {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(loginInfo);
  };

  if (isAuthenticated) {
    return <Redirect to="/chat" />;
  }

  return (
    <>
      <Container>
        <Alert />
        <h1 className="mt-5">Login User</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="Enter email"
            getData={(email) => setloginInfo({ ...loginInfo, email })}
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter password"
            getData={(password) => setloginInfo({ ...loginInfo, password })}
          />
          <Button className="btn" variant="dark" type="submit">
            Login
          </Button>
        </Form>
        <p className="mt-3">
          Don't have account? <Link to="/register">Register here</Link>
        </p>
      </Container>
    </>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);
