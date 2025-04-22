const http = require('http');
const URL = require('url');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'urls.json');

function loadData() {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function writeData(data, callback) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    callback(JSON.stringify({ message: 'ok' }));
  });
}

function addItem(name, url, callback) {
  const data = loadData();
  data.urls.push({ name, url });
  writeData(data, callback);
}

function removeItem(urlToRemove, callback) {
  const data = loadData();
  data.urls = data.urls.filter((el) => String(el.url) !== String(urlToRemove));
  writeData(data, callback);
}

http
  .createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query;

    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
    });

    if (!name || !url) {
      const data = loadData();
      return res.end(JSON.stringify(data));
    }

    if (del) {
      return removeItem(url, (message) => res.end(message));
    }

    return addItem(name, url, (message) => res.end(message));
  })
  .listen(3000, () => console.log('API is running on port 3000'));
