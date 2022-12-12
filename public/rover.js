const socket = io();

let btnW = document.getElementById('btnW');
let btnA = document.getElementById('btnA');
let btnS = document.getElementById('btnS');
let btnD = document.getElementById('btnD');
let btnStop = document.getElementById('btnStop');

let slider = document.getElementById("slider");
let number = document.getElementById("number");

document.addEventListener('keydown', press)
document.addEventListener('keyup', release)

var up = false;
var right = false;
var down = false;
var left = false;
var upPower = false;
var downPower = false;
var alt = false;
var space = false;

function press(e) {
  if (e.keyCode === 87 /* w */) {
    up = true
  }
  if (e.keyCode === 83 /* s */) {
    down = true
  }
  if (e.keyCode === 65 /* a */) {
    left = true
  }
  if (e.keyCode === 68  /* d */) {
    right = true
  }
  if (e.keyCode === 18 /* alt*/) {
    alt = true
  }
  if (e.keyCode === 38 /* up */) {
    upPower = true
  }
  if (e.keyCode === 40 /* down */) {
    downPower = true
  }
  if (e.keyCode === 32) {
    space = true
  }

  controlls()
}

function release(e) {
  if (e.keyCode === 87 /* w */) {
    up = false
    btnW.style.backgroundColor = "";
  }
  if (e.keyCode === 68 /* d */) {
    right = false
    btnD.style.backgroundColor = "";
  }
  if (e.keyCode === 83 /* s */) {
    down = false
    btnS.style.backgroundColor = "";
  }
  if (e.keyCode === 65 /* a */) {
    left = false
    btnA.style.backgroundColor = "";
  }
  if (e.keyCode === 38 /* up */) {
    upPower = false
  }
  if (e.keyCode === 40 /* down */) {
    downPower = false
  }
  if (e.keyCode === 18) {
    alt = false
  }
  if (e.keyCode === 32) {
    space = false
  }

  controlls()
}

slider.oninput = function () {
  number.innerHTML = slider.value;
  Slider();

}

function Slider() {
  var rMin = slider.getAttribute("min");
  var rMax = slider.getAttribute("max");
  var rStep = slider.getAttribute("step");
  var prop = (rMax - rMin) / rStep; // calcula o número de steps
  var perc = 100 * ((slider.value - rMin) / rStep) / prop; // calcula o percentual proporcional

  // aplica o background
  slider.style.background = 'linear-gradient(to right, #323232 0%, #323232 ' + perc + '%, #ffffffcc ' + perc + '%, #ffffffcc 100%)';
}

var roverMotor = [];

function controlls() {
  if (up) {
    var data = {
      "motorPowerRigh": slider.value,
      "motorPowerLeft": slider.value,
      "motorReverseRight": 0,
      "motorReverseLeft": 0
    };

    btnW.style.backgroundColor = "grey";
    btnW.click();
    roverMotor = JSON.stringify(data);
    socket.emit('rover-motor', roverMotor);

  }
  if (down) {
    var data = {
      "motorPowerRigh": slider.value,
      "motorPowerLeft": slider.value,
      "motorReverseRight": 1,
      "motorReverseLeft": 1
    };

    btnS.style.backgroundColor = "grey";
    btnS.click();
    roverMotor = JSON.stringify(data);
    socket.emit('rover-motor', roverMotor);

  }


  if (alt && right) {
    var data = {
      "motorPowerRigh": slider.value,
      "motorPowerLeft": slider.value,
      "motorReverseRight": 1,
      "motorReverseLeft": 0
    };


    btnD.style.backgroundColor = "grey";
    btnD.click();
    roverMotor = JSON.stringify(data);
    socket.emit('rover-motor-power', roverMotor);

  }

  if (left && alt) {
    var data = {
      motorPowerRigh: slider.value,
      motorPowerLeft: slider.value,
      motorReverseRight: 0,
      motorReverseLeft: 1
    };

    btnA.style.backgroundColor = "gray";
    btnA.click();
    roverMotor = JSON.stringify(data);
    socket.emit('rover-motor-power', roverMotor);
  }

  if (up && right) {
    var data = {
      "motorPowerRigh": slider.value / 2,
      "motorPowerLeft": slider.value,
      "motorReverseRight": 0,
      "motorReverseLeft": 0
    };


    btnW.style.backgroundColor = "grey";
    btnW.click();

    btnD.style.backgroundColor = "grey";
    btnD.click();

    roverMotor = JSON.stringify(data);
    socket.emit('rover-motor-power', roverMotor);

  }

  if (up && left) {
    var data = {
      "motorPowerRigh": slider.value,
      "motorPowerLeft": slider.value / 2,
      "motorReverseRight": 0,
      "motorReverseLeft": 0
    };


    btnW.style.backgroundColor = "grey";
    btnW.click();

    btnA.style.backgroundColor = "grey";
    btnA.click();

    roverMotor = JSON.stringify(data);
    socket.emit('rover-motor-power', roverMotor);

  }
  if (down && right) {
    var data = {
      "motorPowerRigh": slider.value / 2,
      "motorPowerLeft": slider.value,
      "motorReverseRight": 1,
      "motorReverseLeft": 1
    };


    btnS.style.backgroundColor = "grey";
    btnS.click();

    btnD.style.backgroundColor = "grey";
    btnD.click();

    roverMotor = JSON.stringify(data);
    socket.emit('rover-motor-power', roverMotor);

  }
  if (down && left) {
    var data = {
      "motorPowerRigh": slider.value,
      "motorPowerLeft": slider.value / 2,
      "motorReverseRight": 1,
      "motorReverseLeft": 1
    };


    btnS.style.backgroundColor = "grey";
    btnS.click();

    btnA.style.backgroundColor = "grey";
    btnA.click();
    roverMotor = JSON.stringify(data);
    socket.emit('rover-motor-power', roverMotor);

  }

  if (space) {
    var data = {
      "motorPowerRigh": 0,
      "motorPowerLeft": 0,
      "motorReverseRight": 0,
      "motorReverseLeft": 0
    };


    btnStop.style.backgroundColor = "red";
    btnStop.click();

    roverMotor = JSON.stringify(data);
    socket.emit('rover-motor-power', roverMotor);

  }
  else {
    btnStop.style.backgroundColor = "";
  }

  if (upPower) {
    slider.value = parseInt(slider.value) + 1;
    number.innerHTML = slider.value;
    Slider();
  }
  if (downPower) {
    slider.value = parseInt(slider.value) - 1;
    number.innerHTML = slider.value;
    Slider();
  }

}

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('roverMap'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}


btnLogout.addEventListener('click', (e) => {
  e.preventDefault();
  document.title = 'RoverControll';
  socket.emit('logout-request');

});

socket.on('user-disconected', () => {
  window.location.href = "/";

});



let video = document.querySelector("#videoRover");

socket.on('camera-ok', (data) => {
  var videoStrem = new Blob([new Uint8Array(data)], { type: "video/webm;codecs=vp8" });
  video.src = URL.createObjectURL( videoStrem );
  

});
