const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const fs = require('fs');
const mime = require('mime-types');

const app = express();

app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const extension = mime.extension(file.mimetype);
    cb(null, Date.now() + '.' + extension);
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  const reqName = req.params.name;
  const uppName = reqName.charAt(0).toUpperCase() + reqName.slice(1);
  res.render('hello', { name: uppName });
});

app.post('/contact/send-message', upload.single('image'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const image = req.file;

  if (author && sender && title && message && image) {
    res.render('contact', { isSent: true, image: image.filename });
  } else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found..');
})

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