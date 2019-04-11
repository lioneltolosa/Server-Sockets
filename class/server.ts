import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.listeningSockets();
    }

    // Patron Singleton
    public static get instance () {
        return this._intance || (this._intance = new this());
        // return this._intance || (this._intance = new Server());
    }

    private listeningSockets() {
        console.log('Listening to connections - Sockets');

        this.io.on('connection', clients => {
            console.log('User connected');

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