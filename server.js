const express = require('express');
const path = require('path');
const {buildIndex, buildIndexHtml} = require('./build.js');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname);

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.get('/index.html', (req, res) => {
  buildIndexHtml();
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/js/index.js', (req, res) => {
  buildIndex();
  res.sendFile(path.join(publicPath, 'js/index.js'))
});

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`open http://localhost:${port}`);
});