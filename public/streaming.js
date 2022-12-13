const socket = io();

// video constraint
(function () {
  var canvas = document.getElementById("preview");
  var context = canvas.getContext('2d');

  context.webkitImageSmoothingEnabled = false;
  
  canvas.style.width = 380;
  canvas.style.height = 480;
  
  context.width = canvas.width;
  context.height = canvas.height;
  
  var video = document.getElementById("video");
  

  
  function loadCamera(stream) {
    try {
      video.srcObject = stream;
    }
  
    catch (error) {
      video.src = URL.createObjectURL(stream);
    }
 
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
    }, loadCamera);
  }

  setInterval(function initializeCamera() {
    Draw(video, context);
  }, 0.1);
}
initializeCamera();
})();





