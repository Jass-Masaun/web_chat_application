import React, { useEffect, useState } from "react";
import { loadContacts } from "../../../../actions/contact";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { useContacts } from "../../../../contexts/ContactsProvider";
import PropTypes from "prop-types";

const Contacts = ({
  auth: { user },
  loadContacts,
  contact: {
    contacts: { data },
  },
}) => {
  useEffect(() => {
    if (user) {
      loadContacts();
    }
  }, [user]);

  const { setUserEmailAndId } = useContacts();

  return (
    <ListGroup variant="flush">
      {data &&
        data.map((contact) => (
          <ListGroup.Item
            key={contact._id}
            onClick={() => setUserEmailAndId(contact.email, contact._id)}
          >
            {contact.name}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

Contacts.propTypes = {
  loadContacts: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  contact: state.contact,
});

export default connect(mapStateToProps, { loadContacts })(Contacts);
