const videoPlayer = document.querySelector("#video");
// const mediaSource = new MediaSource();

if (videoPlayer) {
    var URL = window.URL || window.webkitURL;
    var buffer = new Uint8Array();
    // videoPlayer.src = URL.createObjectURL(mediaSource);
    var socket = io(window.location.href);
    // mediaSource.addEventListener('sourceopen', function(event) {
    //     var sourceBuffer = mediaSource.addSourceBuffer('video/mp4');
        socket.on('connect', function() {
            console.log("Open connection"); // TODO: Remove debugging.
            socket.emit("video-stream");
            socket.on("video-stream", function(data) {
                console.log("Got data");
                var blob = ss.createBlobReadStream(data);
                videoPlayer.src = URL.createObjectURL(blob);
                // sourceBuffer.appendBuffer(data);
            });
        });
    // }, false);
    videoPlayer.load();
    videoPlayer.onloadeddata = function() {
        videoPlayer.play();
    }
}