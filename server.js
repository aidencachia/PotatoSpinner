const express = require('express');
const app = express();
const path = require('path');;

const port = 80;

app.get('/scripts/potato.js', (req, res) => {
    res.type('application/javascript'); // sets the Content-Type header
    res.sendFile(path.join(__dirname, 'client', 'scripts', 'potato.js'));
  });
  
  // Fallback: serve other static files normally
app.use(express.static(path.join(__dirname, 'client')));

app.listen(port, () => {console.log("Server started on port "+port)});