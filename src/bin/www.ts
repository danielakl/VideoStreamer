#!/usr/bin/env node

import app from '../app';
// import debug from 'debug';
// const deb = require('debug')('http');
import * as http from 'http';
import * as SocketIO from 'socket.io';
import * as fs from "fs";
import * as Path from "path";
import * as SocketIOStream from "socket.io-stream"

// const debug = deb('temp:server');

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const io = SocketIO(server);
io.on('connection', socket => {
    console.log("Established connection with a client.");
    socket.on('video-stream', settings => {
        console.log("Client requesting video stream");
        const filePath = Path.join(__dirname, '..', '..', 'public', 'videos', 'sample.webm');
        const stream = fs.createReadStream(filePath, {highWaterMark: 1024 * 1024});
        stream.on('data', data => {
            socket.emit('video-stream', data);
        });
    });
    socket.on('disconnect', () => {
        console.log("A client disconnected.");
    })
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: number | string): string | number | false {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    // debug('Listening on ' + bind);
    console.log("Listening on " + bind + "\nPS. debug does not work.")
}
