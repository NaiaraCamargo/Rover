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
      facingMode: "environment"
    },
  };
 
  // current video stream
  let videoStream;
  let streamingVideo;
  let stream;
    // use front face camera


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
 

    try {
      videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      alert(videoStream);
      video.srcObject = videoStream;
      streamingVideo = JSON.parse(videoStream);
      //streamingVideo = videoStream.clone();
      alert(streamingVideo);
      socket.emit('streaming-request',  videoStream);
    } catch (err) {
      alert("Could not access the camera");
    }
  }
 
  initializeCamera();

})();

 
  

 