const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/contact.html'));
});

app.get('/info', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/info.html'));
});

app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/history.html'));
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

// Similar solution without Express.js
//
// app.listen(8000, () => {
//   console.log('Server is running on port: 8000');
// });

// const http = require('http');

// const server = http.createServer((req, res) => {

//   if(req.url === '/' && req.method === 'GET') {
//     res.write('<h1>My first server!</h1>');
//     res.end();
//   }
//   else if(req.url === 'about/' && req.method === 'GET') {
//     res.write('<h1>About</h1>');
//     res.end();
//   }

//   // ... then similar other routes

// })

// server.listen(8000, (err) => {
//   if (err) {
//     return console.log('something bad happened', err);
//   }

//   console.log(`server is listening on ${8000}`);
// });