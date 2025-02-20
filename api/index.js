const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const port = 433;
const dataFilePath = path.join(__dirname, 'data.json');

app.use(express.json())

app.post('/save', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', function (err, data) {
    if (err) throw err;

    let key;

    const obj = JSON.parse(data);
    do key = uuidv4(); while (Object.keys(obj).includes(key));
    
    const entry = {}
    entry[key] = req.body;

    obj["data"][key] = req.body;

    fs.writeFile(dataFilePath, JSON.stringify(obj, null, "\t"),
    err => {
        // Checking for errors 
        if (err) throw err;

        // Success 
        console.log("Done writing");
    });
    responseBody = {
      key: key
    }
    res.status(201).send(responseBody);
  });
});

app.patch('/save', (req, res) => {

  fs.readFile(dataFilePath, 'utf8', function (err, data) {
    if (err) throw err;

    const obj = JSON.parse(data);
    let key = req.query.key;
    
    const entry = {}
    entry[key] = req.body;

    obj["data"][key] = req.body;

    fs.writeFile('data.json', JSON.stringify(obj, null, "\t"),
    err => {
        // Checking for errors 
        if (err) throw err;

        // Success 
        console.log("Done writing");
    });

    res.sendStatus(201);
  });
});

app.get('/save', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', function (err, data) {
    if (err) throw err;

    const obj = JSON.parse(data);
    let key = req.query.key;

    res.status(201).send(obj["data"][key]);
  });
});
  
app.use(express.static(path.join(__dirname, '..' , 'client')));

app.listen(port, () => {console.log("Server started on port "+port)});