import React from "react";
import io from "socket.io-client";

export const socket = io(import.meta.env.VITE_BACKEND_URL, {
    transports: ["websocket"],
});
export const SocketContext = React.createContext({
    socket,
    closeContest: false,
});
