const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const models = require('./models')
const PORT = 5001;
const HttpServer = require("http").createServer(app);
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
