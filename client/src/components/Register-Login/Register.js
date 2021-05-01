import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { registerUser } from "../../actions/auth";
import { connect } from "react-redux";
import Alert from "../Alert";
import PropTypes from "prop-types";
import Input from "../Chat/Input/Input";

const Register = ({ auth: { isAuthenticated }, registerUser }) => {
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(registerInfo);
  };

  if (isAuthenticated) {
    return <Redirect to="/chat" />;
  }

  return (
    <>
      <Container>
        <Alert />
        <h1 className="mt-5">Register New User</h1>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Enter name"
            getData={(name) => setRegisterInfo({ ...registerInfo, name })}
          />

          <Input
            type="email"
            name="email"
            placeholder="Enter Email"
            getData={(email) => setRegisterInfo({ ...registerInfo, email })}
          />

          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            getData={(password) =>
              setRegisterInfo({ ...registerInfo, password })
            }
          />
          <Button className="btn" variant="dark" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(Register);
