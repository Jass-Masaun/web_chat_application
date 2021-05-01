import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, id }) => {
  const [socket, setSocket] = useState();

  // useEffect(() => {
  //   console.log(socket);
  // }, [socket]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", { query: { id } });

    setSocket(newSocket);
    return () => newSocket.close();
  }, [id]);
  return (
    <>
      {socket != undefined && (
        <SocketContext.Provider value={{ socket }}>
          {children}
        </SocketContext.Provider>
      )}
    </>
  );
};
