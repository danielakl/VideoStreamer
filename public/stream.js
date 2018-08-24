var videoPlayer = document.querySelector("#videoPlayer");
var videoSource = document.querySelector("#videoSource");
var mediaSource = new MediaSource();
var queue = [];
var isFirstChunk = true;

if (videoPlayer) {
    videoPlayer.pause();
    var URL = window.URL || window.webkitURL;
    var socket = io(window.location.href);
    videoSource.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', function(event) {
        console.log("MediaSource open");
        var sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
        socket.on('connect', function() {
            console.log("Open connection");
            socket.emit("video-stream");
            socket.on("video-stream", function(data) {
                console.log("Got data " + data);
                if (isFirstChunk) {
                    sourceBuffer.appendBuffer(data);
                    isFirstChunk = false;
                } else {
                    queue.push(data);
                    if (mediaSource.readyState === 'open') {
                        sourceBuffer.appendBuffer(queue.shift());
                    }
                }
            });
            sourceBuffer.addEventListener('updateend', function() {
                if (queue.length) {
                    console.log("MediaSource ready, queue");
                    if (mediaSource.readyState === 'open') {
                        sourceBuffer.appendBuffer(queue.shift());
                    }
                }
            });
        });
    }, false);
    videoPlayer.load();
    videoPlayer.onloadeddata = function() {
        videoPlayer.play();
    }
}