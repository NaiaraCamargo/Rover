const socket = io();

(function () {
  const video = document.querySelector("#video");
  // video constraints
  const constraints = {
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
    },
  };
 
  // current video stream
  let videoStream;
  let streamingVideo;
    // use front face camera
    let useFrontCamera = true;

  function stopVideoStream() {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }
 
  // initialize
  async function initializeCamera() {
    stopVideoStream();
    constraints.video.facingMode = useFrontCamera ? "user" : "environment";

    try {
      videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = videoStream;
      streamingVideo = video.srcObject;
      socket.emit('streaming-request', streamingVideo);
    } catch (err) {
      alert("Could not access the camera");
    }
  }
 
  initializeCamera();

})();

 
  

 