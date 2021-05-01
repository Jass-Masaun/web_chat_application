import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import OpenConversation from "./OpenConversation/OpenConversation";
import { useContacts } from "../../contexts/ContactsProvider";
import { SocketProvider } from "../../contexts/SocketProvider";
import { connect } from "react-redux";
//import { getAllRecieversChats } from "../../actions/chat";
import PropTypes from "prop-types";

const Chat = ({ auth }) => {
  const { email } = useContacts();

  return (
    <>
      {auth && auth.user && auth.user.data && (
        <SocketProvider id={auth.user.data._id}>
          <div className="d-flex" style={{ height: "85vh" }}>
            <Sidebar />
            {email && <OpenConversation />}
          </div>
        </SocketProvider>
      )}
    </>
  );
};

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Chat);
