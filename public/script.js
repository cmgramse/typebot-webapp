import { initializeTypebot } from './typebot.js';

const socket = io.connect(window.location.origin);

document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';

    initializeTypebot();
    updateVideoPlayer();
});

function updateVideoPlayer() {
    socket.emit('getVideoUrl');

    socket.on('videoUrl', (url) => {
        if (url) {
            const videoPlayer = document.getElementById('video-player');
            console.log("Updating video player with URL:", url);
            videoPlayer.src = url;
            videoPlayer.style.display = 'block';
            videoPlayer.play();
        } else {
            console.log("No video URL provided, not updating video player");
        }
    });
}


// this is a simple solution and might not work perfectly 
// if you have many users interacting with your site at the same time 
// because they might overwrite each other's video URLs. 
// For a production-level application, you want a more robust system 
// for managing and serving these video URLs, such as a database and user sessions.