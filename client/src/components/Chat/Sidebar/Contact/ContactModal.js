import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createContact } from "../../../../actions/contact";
import Alert from "../../../Alert";

const ContactModal = ({ closeModal, createContact }) => {
  const [input, setInput] = useState({
    email: "",
    name: "",
  });

  const { email, name } = input;

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createContact(email, name);
    if (res) {
      closeModal();
    }
  };

  return (
    <>
      <Modal.Header closeButton>Add new contact</Modal.Header>
      <Modal.Body>
        <Alert />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              placeholder="Enter name"
              onChange={handleInput}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

ContactModal.propTypes = {
  createContact: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact,
});

export default connect(mapStateToProps, { createContact })(ContactModal);
