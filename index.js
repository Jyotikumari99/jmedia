const video = document.getElementById("video");

function getCurrentURL() {
  return window.location.href;
}
const url = getCurrentURL();
const pos = url.search("/ailabs.html");
function startVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: {} })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error(err);
    });
}
if (pos !== -1) {
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./models"),
  ]).then(startVideo);
}
video.addEventListener("play", () => {
  setInterval(async () => {
    const detection = await faceapi.detectAllFaces(video, new faceapi());
  }, 100);
});
