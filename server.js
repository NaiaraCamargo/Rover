const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const router = express.Router();
app.use(express.static(path.join(__dirname, 'public')));

app.set(express.urlencoded({ extended: false }));

app.set(express.json());

// landing
let connectedUser = "";
let jsonRover =[];
let connectedStreaming;

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on('login-request', (username) => {
    socket.username = username;
    connectedUser = username;
    console.log('Usuario conectado: ' + connectedUser);

    socket.emit('user-ok', connectedUser);
  });


  socket.on('logout-request', () => {
    console.log(" Desconectado ");
    socket.emit('user-disconected');

  });

  socket.on('rover-motor', (roverMotor) => {
  socket.roverMotor = roverMotor;
  jsonRover = JSON.parse(roverMotor)
  console.log('Rover Motor:' + roverMotor);

    app.get("/roverGet", (req, res) => {
      res.json((jsonRover));
    });

  });

  socket.on('rover-motor-power', (roverMotor) => {
    socket.roverMotor = roverMotor;
    jsonRover = JSON.parse(roverMotor)
    console.log("Rover Motor Power:" + roverMotor);

    app.get("/roverGet", (req, res) => {
      res.json((jsonRover));
    });

  });
  
 
    socket.on('streaming-request', function(streamingVideo) {
      socket.broadcast.emit('streaming-ok', (streamingVideo));
  });
       


  socket.on('disconnect', () => {
    console.log("Desconetado");
  
  });

});


server.listen(3003, () => {
  console.log("server is running");
});
