// WebSocketContext.js
import React, { createContext, useContext, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);

    const connect = () => {
        const socket = new SockJS('http://localhost:8010/server1');
        const client = Stomp.over(socket);
        client.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            setStompClient(client);
        });
    };

    const disconnect = (callback) => {
        if (stompClient) {
            stompClient.disconnect(() => {
                console.log('Disconnected from WebSocket');
                setStompClient(null);
                if (callback) callback();
            });
        }
    };

    return (
        <WebSocketContext.Provider value={{ stompClient, connect, disconnect }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
