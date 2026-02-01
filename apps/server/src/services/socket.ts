import {Server} from 'socket.io'

class SocketService {
    private _io : Server;
    constructor() {
        console.log("SocketService initialized");
        this._io = new Server({
            cors : {
                allowedHeaders : ["*"],
                origin : "*",
            }
        });
      
    }
    public initListeners(){
       const io = this._io;
       console.log("Initializing socket listeners");
       io.on('connection',(socket)=>{
            console.log(`New client connected: ${socket.id}`);

            socket.on('event:message',async ({message}:{message : string})=>{

                console.log(`Received message from ${socket.id}: ${message}`);
    })}

)}

    get io(){
        return this._io;
    }
}

export default SocketService