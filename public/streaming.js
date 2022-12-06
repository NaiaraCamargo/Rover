const socket = io();

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
    } catch (err) {
      alert("Could not access the camera");
    }
  }
 


  initializeCamera();

  streamingVideo = video.srcObject;
  socket.emit('streaming-request', streamingVideo);

  socket.on('streaming-ok', (streamingVideo) => { 

      // use front face camera
      let useFrontCamera = true;
   
      // current video stream
      const video = document.querySelector("#videoRover");
      const btnPlay = document.querySelector("#btnPlay");
      const btnPause = document.querySelector("#btnPause");
      const btnScreenshot = document.querySelector("#btnScreenshot");
      const btnChangeCamera = document.querySelector("#btnChangeCamera");
      const screenshotsContainer = document.querySelector("#screenshots");
      const canvas = document.querySelector("#canvas");
      const devicesSelect = document.querySelector("#devicesSelect");

      video.srcObject = streamingVideo;

   
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
   
  
   
    // handle events
    // play
    btnPlay.addEventListener("click", function () {
      video.play();
      btnPlay.classList.add("is-hidden");
      btnPause.classList.remove("is-hidden");
    });
   
    // pause
    btnPause.addEventListener("click", function () {
      video.pause();
      btnPause.classList.add("is-hidden");
      btnPlay.classList.remove("is-hidden");
    });
   
    // take screenshot
    btnScreenshot.addEventListener("click", function () {
      const img = document.createElement("img");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      img.src = canvas.toDataURL("image/png");
      screenshotsContainer.prepend(img);
    });
   
    // switch camera
    btnChangeCamera.addEventListener("click", function () {
      useFrontCamera = !useFrontCamera;
   
      initializeCamera();
    });
   
    // stop video stream

});
  