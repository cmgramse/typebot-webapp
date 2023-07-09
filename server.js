const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(bodyParser.json());

let latestVideoUrl = '';  // A variable to store the latest video URL

app.use(express.static(path.join(__dirname, 'public')));

app.get('/latest-video-url', (req, res) => {
    // Send the latest video URL when requested
    console.log('Received request for latest video URL:', latestVideoUrl);
    res.json({ url: latestVideoUrl });
});

app.post('/webhook', (req, res) => {
    // Replace 'your-secret-value' with your actual secret
    if (req.headers['authentication'] !== 'tC0hIXq!6AV8^^u*ZutWc') {
        console.log('Invalid webhook secret');
        return res.sendStatus(403);  // Forbidden
    }

    console.log('Received webhook:', req.body);
    latestVideoUrl = req.body.videoUrl;  // Update the latest video URL
    console.log('Updated latest video URL to:', latestVideoUrl);
    io.emit('videoUrl', latestVideoUrl);  // Emit the latest video URL to all connected clients
    res.sendStatus(200);
});

const port = process.env.PORT;
const server = http.createServer(app);
const io = socketIo(server);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
