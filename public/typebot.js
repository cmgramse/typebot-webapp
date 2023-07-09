import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.0/dist/web.js'

export function initializeTypebot() {
    console.log("initializeTypebot is called");
    Typebot.initStandard({ 
        typebot: "alice-botai",
        onInit: function() {
            console.log('Chatbot initialized');
        },
        onEnd: function() {
            console.log('Chatbot ended');
        },
        onNewInputBlock: function(inputBlock) {
            console.log('New input block displayed', inputBlock.id);
            const videoUrl = getVideoUrlFromAnswer(inputBlock.message);
            updateVideoPlayer(videoUrl);
        }
    });
}

function updateVideoPlayer(videoUrl) {
    console.log("updateVideoPlayer is called with URL:", videoUrl);
    if (videoUrl) {
        const videoPlayer = document.getElementById('video-player');
        console.log("Updating video player with URL:", videoUrl);
        videoPlayer.src = videoUrl;
        videoPlayer.style.display = 'block';
        videoPlayer.play();
    } else {
        console.log("No video URL provided, not updating video player");
    }
}

function getVideoUrlFromAnswer(answer) {
    console.log("getVideoUrlFromAnswer is called with answer:", answer);
    var parser = new DOMParser();
    var doc = parser.parseFromString(answer, 'text/html');
    var videoElement = doc.querySelector('video');
    if (videoElement) {
        console.log("Video URL found in answer:", videoElement.src);
        return videoElement.src;
    } else {
        console.log("No video URL found in answer");
        return null;
    }
}
