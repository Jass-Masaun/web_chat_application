import React, { useState, useContext } from "react";

const ContactsContext = React.createContext();

export const useContacts = () => useContext(ContactsContext);

export const ContactsProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  const setUserEmailAndId = (email, id) => {
    setEmail(email);
    setId(id);
  };

  return (
    <ContactsContext.Provider value={{ email, id, setUserEmailAndId }}>
      {children}
    </ContactsContext.Provider>
  );
};
