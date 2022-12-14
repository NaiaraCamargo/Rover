const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const router = express.Router();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/rover', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/rover.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/streaming', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/streaming.html'));
});

app.set(express.urlencoded({ extended: false }));

app.set(express.json());

// landing
let connectedUser = "";
let jsonRover = [];
let led = [];

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on('login-request', (username) => {
    socket.username = username;
    connectedUser = username;
    console.log('Usuario conectado: ' + connectedUser);

    socket.emit('user-ok', connectedUser);
  });


  socket.on('logout-request', () => {
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

  socket.on('stream', function (data) {
    socket.broadcast.emit('stream', data);
  });

  socket.on('check-led', (ledGet) => {
    socket.ledGet = ledGet;
    led = JSON.parse(ledGet)
    console.log( led);

    app.get("/ledGet", (req, res) => {
      res.json(led);
    });

  });

  socket.on('disconnect', () => {
    console.log("Desconetado");
    socket.broadcast.emit('close-ok');

  });

});


server.listen(3003, () => {
  console.log("server is running");
});
