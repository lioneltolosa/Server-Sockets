import Server from './class/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

// const server = new Server();

const server = Server.instance;

// parse application/x-www-form-urlencoded
server.app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
server.app.use(bodyParser.json())

// CORS
server.app.use(cors({ origin: true, credentials: true }))

server.app.use('/', router)

server.start( () => {
    console.log(`Server run in the port ${ server.port }`);
})