// const createError = require("http-errors");
const express = require("express");
// var app = require("../app");
var http = require("http");
require("colors");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const fileUpload = require("express-fileupload");
// const morganMiddleware = require("./config/morgan");
// const helmet = require("helmet");
// const promMid = require("express-prometheus-middleware");
// require("./config/redis");

// const { launchRequestBackground } = require("./background/request");
// const perfPreprocessing = require("./config/perfpreprocessing");
// global["appRoot"] = path.resolve(__dirname);

// if (!process.env.CICD) {
//     perfPreprocessing.init();

//     // LAUNCHING ALL BACKGROUND TASK
//     launchRequestBackground();
// }














const app = express();












// var path = require("path");

// if (process.env.NODE_ENV !== "production") {
//     console.log("WARNING: This process started in development mode".red);
//     require("dotenv").config({
//         path: path.resolve(process.cwd(), "../Core/.env")
//     });
// }





/**
 * Get port from environment and store in Express.
 */

 var port = normalizePort("3000");
 app.set("port", port);
 
 /**
  * Create HTTP server.
  */
 
 var server = http.createServer(app);
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on("error", onError);
 server.on("listening", onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
     var port = parseInt(val, 10);
 
     if (isNaN(port)) {
     // named pipe
         return val;
     }
 
     if (port >= 0) {
     // port number
         return port;
     }
 
     return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error) {
    console.log("Error", error)
     if (error.syscall !== "listen") {
         throw error;
     }
 
     var bind = typeof port === "string"
         ? "Pipe " + port
         : "Port " + port;
 
     // handle specific listen errors with friendly messages
     switch (error.code) {
     case "EACCES":
         console.error(bind + " requires elevated privileges");
         process.exit(1);
         break;
     case "EADDRINUSE":
         console.error(bind + " is already in use");
         process.exit(1);
         break;
     default:
         throw error;
     }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
     var addr = server.address();
     console.log("LISTENING",addr)
     var bind = typeof addr === "string"
         ? "pipe " + addr
         : "port " + addr.port;
     console.log(`INFO: Server started on ${bind}`.gray);
 }
 







// app.set("trust proxy", true);
// app.use(promMid({
//     authenticate: (req) => {
//         return `Bearer ${process.env.PROM_TOKEN}` === req.headers["authorization"];
//     }
// }));
// app.use(helmet());

// app.use(morganMiddleware);

// app.use(fileUpload({
//     limits: { fileSize: 1024 * 1024 * 1024 }
// }));
app.use(express.json({ limit: "50mb" }));

// app.use(function (req, res, next) {
//     res.header("Content-Security-Policy", "frame-ancestors " + process.env.APP_URL);
//     next();
// });

// let corsOptions = {
//     "origin": "*",
//     "methods": "GET,PUT,POST,DELETE,OPTIONS,PATCH",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 200
// };

// app.use(cors(corsOptions));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "docs")));

// if (process.env.DEBUG_EMAIL) {
//     const exphbs = require("express-handlebars");
//     app.engine(".hbs", exphbs({ defaultLayout: false }));
//     app.set("view engine", ".hbs");
//     app.set("views", path.join(process.cwd(), "../Core/views/email/"));
//     app.use("/dev/", require("./routes/dev/router"));
// }
// app.use("/1.0/", version1Router);
const version1Router = require("./routes/routing");
app.use("/", version1Router);
// app.use("/1.1/", version1Router_1_1);

// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // ### HANDLING ERROR FOR EVERY CALL OF next(createError(code, message));
// function handlingError(err, req, res, next) {
//     res.status(err.status);
//     res.json({ response: "NOK", message: err.message });
// }

// // noinspection JSCheckFunctionSignatures
// app.use(handlingError);

module.exports = app;
