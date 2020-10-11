const video = document.getElementById('video')
const canvas = document.getElementById('canvas')

const startVideo = () => {
  navigator.getUserMedia(
    { video: {} },
    stream => {
      video.srcObject = stream
      video.play()
    },
    err => console.error(err)
  )
}
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(startVideo).catch(err => alert("Thiết bị của bạn không hỗ trợ Camera!"))

video.addEventListener('play', async () => {
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
  }, 100)
})

$('#btn-login').click(async () => {
  const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
  $.post('/user/login', {user: "Hai Van"}, data => {
    if(data.msg == "OK")
      window.location.href = "http://localhost:8080/"
  })
})
