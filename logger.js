const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const emitter = new EventEmitter();

emitter.on('log', (message) => {
  fs.appendFile(path.join(__dirname, 'log.txt'), JSON.stringify(message) + '\n', (err) => {
    if (err) throw err;
    console.log('The message was logged!');
  })
});

function log(message) {
  emitter.emit('log', message);
}

module.exports = log;
