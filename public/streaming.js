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
        facingMode: "environment"
      },
    };



  let stream;


  // stop video stream


  var streaming = [];
  // initialize
  async function initializeCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;   

      const mediaRecorder = new MediaRecorder(stream)
      let countUploadChunk = 0
      mediaRecorder.ondataavailable = function (e) {
      streaming.push(e.data);
      socket.emit('camera-on', streaming);
       countUploadChunk++
     }

    mediaRecorder.start()

    setInterval(() => {
        mediaRecorder.requestData()
    }, 2000)    

    } catch (err) {
      alert("Could not access the camera");
    }
  }

  initializeCamera();

  //window.addEventListener('beforeunload', function (e) {
   // e.preventDefault();
  //  e.returnValue = '';
   // socket.emit('streaming-close');
//});






