'use client';


import React, { use, useCallback, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';


interface SocketProviderProps {
    children : React.ReactNode;
}



interface ISocketContext {
    sendMessage: (msg: string) => any;  
    messages : string[]
}

const socketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(socketContext);

    if(!state) throw new Error(`state is undefined`);

    return state;

}

export const SocketProvider : React.FC<SocketProviderProps> = ({children}) => {
    const [socket , setSocket] = React.useState<Socket | null>(null);

    const [messages, setMessages] = React.useState<string[]>([])

    const sendMessage : ISocketContext['sendMessage'] = useCallback((msg: string) => {
        console.log("Sending message:", msg);

        if(socket) {
            socket.emit('event:message', {message : msg} );
        }
    }, [socket]);

    const onMessageRec = useCallback((msg : string)=>{
        console.log('From server Msg recieved',msg)

        const {message} = JSON.parse(msg) as {message : string};


        setMessages((prev) => [...prev, message]);
    },[])

    useEffect(() => {
        const _socket: Socket = io('http://localhost:5000');
        _socket.on('message', onMessageRec);
        setSocket(_socket);
        return () => {
            _socket.disconnect();
            _socket.off('message', onMessageRec);
            setSocket(null);
        }
    },[])

  
    return (
        <socketContext.Provider value={{sendMessage , messages}}>
            {children}
        </socketContext.Provider>
    )
}