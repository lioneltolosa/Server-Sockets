import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

export default class Server {

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.listeningSockets();
    }

    private listeningSockets() {
        console.log('Listening to connections - Sockets');

        this.io.on('connection', clients => {
            console.log('an user connected');

            clients.on('disconnect', () => {
              console.log('user disconnected');
            });
        });
          
    }

    start( callback: Function) {
        // this.app.listen( this.port, callback );
        this.httpServer.listen( this.port, () => {
            
        });
    }
}