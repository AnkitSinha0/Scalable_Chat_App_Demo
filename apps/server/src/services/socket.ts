import {Server} from 'socket.io'
import {Redis} from 'ioredis'
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined");
}

const pub = new Redis(process.env.REDIS_URL);
const sub = new Redis(process.env.REDIS_URL);

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
   sub.subscribe('MESSAGES')

    sub.on('message', (channel , message)=>{
    if(channel === 'MESSAGES'){
        console.log("new message from redis",message)
        this._io.emit("message",message);
    }
   })


      
    }


    
    public initListeners(){
       const io = this._io;
       console.log("Initializing socket listeners");
       io.on('connection',(socket)=>{
            console.log(`New client connected: ${socket.id}`);

            socket.on('event:message',async({message}:{message : string})=>{

                console.log(`Received message from ${socket.id}: ${message}`);
                // publish this message to redis

                await pub.publish('MESSAGES', JSON.stringify({message}));
    })}

)};



    get io(){
        return this._io;
    }
}

export default SocketService