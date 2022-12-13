const socket = io();

(function () {

  var log = document.getElementById("log");

  var canvas = document.getElementById("preview");
  var context = canvas.getContext('2d');

  context.webkitImageSmoothingEnabled = false;
  context.webkitImageSmoothingQuality = "high";
  
  //canvas.width = this.width;
  //canvas.height = this.height;
  
  context.width = canvas.width;
  context.height = canvas.height;
  
  var video = document.getElementById("video");
  
  
  function logger(msg) {
    log.innerHTML += msg;
  }
  
  function loadCamera(stream) {
    try {
      video.srcObject = stream;
    }
  
    catch (error) {
      video.src = URL.createObjectURL(stream);
    }
    logger("Camera connected");
  }
  
  function loadFail() {
    logger("Camera not connected");
  }
  
  function Draw(video, context) {
    context.drawImage(video, 0, 0, context.width, context.height);
    socket.emit('stream', canvas.toDataURL('image/webp'));
  }
  
  async function initializeCamera() {
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);

  if (navigator.getUserMedia) {
    navigator.getUserMedia({
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440,
        },
        facingMode: "environment"
      },
    }, loadCamera, loadFail);
  }

  setInterval(function initializeCamera() {
    Draw(video, context);
  }, 0.1);
}
initializeCamera();


})();



