const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer((req, res) => {
    const file = req.url === '/' ? 'index.html' : req.url;
    const filePath = path.join(__dirname, 'public', file);
    const extname = String(path.extname(filePath)).toLowerCase();

    const allowedFileTypes = ['.html', '.css', '.js'];
    const allowed = allowedFileTypes.find((el) => el === extname);

    if (!allowed) return

    fs.readFile(filePath, (err, content) => {
      if (err) {
        return res.end('Error loading index.html');
      }
      res.end(content);
    });
  })
  .listen(5001, () => console.log('Server is running on port 5001'));
