const WebSocket = require('ws');

const run = (text) => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket('ws://localhost:9999');

    socket.onopen = () => {
      console.log('WebSocket connection established.');
      socket.send(text);
    };

    socket.onmessage = (event) => {
      console.log('Response from server:', event.data);
      resolve(event.data);
      socket.close();
    };

    socket.onerror = (error) => {
      console.error(`[error] ${error.message}`);
      reject(error);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        console.error('Connection died');
      }
    };
  });
};

module.exports = { run };
