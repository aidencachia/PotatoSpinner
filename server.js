const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const port = 80;

app.use(express.json())

app.post('/save', (req, res) => {
  fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) throw err;

    const obj = JSON.parse(data);
    let key;
    do key = uuidv4(); while (Object.keys(obj).includes(key));
    
    const entry = {}
    entry[key] = req.body;

    fs.appendFile('data.json', JSON.stringify(entry)+',',
    err => {
        // Checking for errors 
        if (err) throw err;

        // Success 
        console.log("Done writing");
    });

    console.log(entry);
    res.location = "https://127.0.0.1/save?"+key;
    res.status(201);
    res.send(key);
  });
});

app.patch('/save', (req, res) => {
  res.send(data);
});

app.get('/save', (req, res) => {
  res.send(data);
});
  
app.use(express.static(path.join(__dirname, 'client')));

app.listen(port, () => {console.log("Server started on port "+port)});