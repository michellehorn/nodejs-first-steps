const os = require('os');
const log = require('./logger');

function showStats() {
  const { freemem, totalmem } = os;

  const total = parseInt(totalmem() / 1024 / 1024);
  const free = parseInt(freemem() / 1024 / 1024);
  const percent = parseInt((free / total) * 100);

  const stats = {
    free: `${free}MB`,
    total: `${total}MB`,
    percent: `${percent}%`,
  };

  console.clear();
  console.log('==== PC Stats ====');
  console.table(stats);

  log(stats)
}


setInterval(() => {
  showStats();
}, 1000);
