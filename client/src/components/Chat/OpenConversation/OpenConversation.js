import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useContacts } from "../../../contexts/ContactsProvider";
import { connect } from "react-redux";
import { newChat, getSelectedRecieverChat } from "../../../actions/chat";
import { useSocket } from "../../../contexts/SocketProvider";
import PropTypes from "prop-types";

const OpenConversation = ({
  auth: {
    user: {
      data: { _id },
    },
  },
  newChat,
  getSelectedRecieverChat,
  chat: { selectedRecieverChat },
}) => {
  const { socket } = useSocket();

  const { email, id } = useContacts();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send-message", {
      reciever: id,
      message,
    });
    newChat(message, _id, id);
    setMessage("");
  };

  useEffect(async () => {
    setChatMessages([]);
    await getSelectedRecieverChat(id);
  }, [id]);

  useEffect(() => {
    selectedRecieverChat && selectedRecieverChat.reciever == id
      ? setChatMessages(selectedRecieverChat.messages)
      : setChatMessages([]);
  }, [selectedRecieverChat]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("recieve-message", async ({ message, sender, reciever }) => {
      await newChat(message, sender, reciever);
      if (reciever != id) {
        console.log("true");
        getSelectedRecieverChat(id);
        setChatMessages(selectedRecieverChat.messages);
        //setChatMessages(chat.selectedRecieverChat);
      }
    });

    return () => socket.off("recieve-message");
  }, [socket, id]);

  return (
    <div className="d-flex flex-column flex-grow-1">
      <h4>Message to - {email}</h4>
      <div className="flex-grow-1 overflow-auto">
        <div className="h-100 d-flex flex-column align-items-start justify-content-end px-3">
          {chatMessages &&
            chatMessages.length > 0 &&
            chatMessages.map((msg, index) => (
              <div key={index} className="my-1 d-flex flex-column">
                {msg.sender == _id ? (
                  <p>you - {msg.message}</p>
                ) : (
                  <p>
                    {email} - {msg.message}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
      <Form className="send-message" onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Group>
            <Form.Control
              name="message"
              value={message}
              type="text"
              placeholder="Enter your message"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>
          <InputGroup.Append>
            <Button type="submit">Send</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
};

OpenConversation.propTypes = {
  newChat: PropTypes.func.isRequired,
  //getUserChat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

export default connect(mapStateToProps, { newChat, getSelectedRecieverChat })(
  OpenConversation
);
