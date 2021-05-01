import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Coversation/Conversations";
import Contacts from "./Contact/Contacts";
import Rooms from "./Room/Rooms";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConversationModal from "./Coversation/ConversationModal";
import ContactModal from "./Contact/ContactModal";
import RoomModal from "./Room/RoomModal";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";
const ROOMS_KEY = "rooms";

const Sidebar = ({ auth: { user } }) => {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const ConversationOpen = activeKey === CONVERSATIONS_KEY;
  const ContactOpen = activeKey === CONTACTS_KEY;

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div style={{ width: "20%" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link eventKey={ROOMS_KEY}>Rooms</Nav.Link>
          </Nav.Item> */}
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
          {/* <Tab.Pane eventKey={ROOMS_KEY}>
            <Rooms />
          </Tab.Pane> */}
        </Tab.Content>
        <div className=" p-2 border-top border-right small">
          Your email:
          <span className="text-muted"> {user && user.data.email}</span>
        </div>
        <Button
          variant="dark"
          className="rounded-0"
          onClick={() => setModalOpen(true)}
        >
          New{" "}
          {
            ConversationOpen ? "Conversation" : ContactOpen && "Contact"
            //  : "Room"
          }
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {
          ConversationOpen ? (
            <ConversationModal closeModal={closeModal} />
          ) : (
            ContactOpen && <ContactModal closeModal={closeModal} />
          )
          // : (
          //   <RoomModal closeModal={closeModal} />
          // )
        }
      </Modal>
    </div>
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Sidebar);
