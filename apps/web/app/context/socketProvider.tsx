'use client';


import React, { use, useCallback, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';


interface SocketProviderProps {
    children : React.ReactNode;
}



interface ISocketContext {
    sendMessage: (msg: string) => any;    
}

const socketContext = React.createContext<ISocketContext | null>(null);


export const SocketProvider : React.FC<SocketProviderProps> = ({children}) => {
    

    const sendMessage : ISocketContext['sendMessage'] = useCallback((msg: string) => {
        console.log("Sending message:", msg);
    }, []);

    useEffect(() => {
        const _socket: Socket = io('http://localhost:5000');

        return () => {
            _socket.disconnect();
        }
    },[])

  
    return (
        <socketContext.Provider value={{sendMessage}}>
            {children}
        </socketContext.Provider>
    )
}