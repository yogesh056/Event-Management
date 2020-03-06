const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require('./models')
const PORT = 5000;
const HttpServer = require("http").createServer(app);
// const io = require('socket.io')(HttpServer)
// const ClientManager = require('./ClientManager')
// const ChatroomManager = require('./ChatroomManager')
// const makeHandlers = require('./handlers')
// const clientManager = ClientManager()
// const chatroomManager = ChatroomManager()
global.log = require("logger").createLogger("dev.log");
global.log.setLevel("error");
class Server {
    constructor() {
        this.init();
    }
    async init() {
        try {
            this.initServer();
            this.initExpress();
            this.initControllers()
            this.initRoutes()
        } catch (err) {
            global.log.error(err);
        }
    }
    initExpress() {

        app.use(bodyParser.json());
        app.use(cors());
        app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
    }
    // initSocket() {
    //     io.on('connection', function (client) {
    //         const {
    //             handleRegister,
    //             handleJoin,
    //             handleLeave,
    //             handleMessage,
    //             handleGetChatrooms,
    //             handleGetAvailableUsers,
    //             handleDisconnect
    //         } = makeHandlers(client, clientManager, chatroomManager)

    //         console.log('client connected...', client.id)
    //         clientManager.addClient(client)

    //         client.on('register', handleRegister)

    //         client.on('join', handleJoin)

    //         client.on('leave', handleLeave)

    //         client.on('message', handleMessage)

    //         client.on('chatrooms', handleGetChatrooms)

    //         client.on('availableUsers', handleGetAvailableUsers)

    //         client.on('disconnect', function () {
    //             console.log('client disconnect...', client.id)
    //             handleDisconnect()
    //         })

    //         client.on('error', function (err) {
    //             console.log('received error from client:', client.id)
    //             console.log(err)
    //         })
    //     })
    // }
    initServer() {
        try {
            models.sequelize.sync().then(function () {
                HttpServer.listen(PORT, () => {
                    console.log("DB Established")
                    console.log(`Server Running on ${PORT}`);

                });
            })
        }
        catch (err) {
            global.log.error(err);
        }


    }
    initControllers() {
        try {
            this.users_controller = require("./controllers/users")();
            this.events_controller = require("./controllers/events")();
        }
        catch (err) {
            global.log.error(err);
        }

    }
    initRoutes() {
        try {

            const usersRouter = require("./routes/users")(this.users_controller);
            app.use(
                '/api/users',
                usersRouter.getRouter()
            );
            const eventsRouter = require("./routes/events")(this.events_controller);
            app.use(
                '/api/events',
                eventsRouter.getRouter()
            );
        }
        catch (err) {
            global.log.error(err);
        }
    }

    onClose() {
        this.models.map(m => {
            m.connection.end();
        });
        HttpServer.close();
    }

}
const server = new Server();
