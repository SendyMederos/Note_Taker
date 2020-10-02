const express = require('express');
const path = require('path');
const fs = require('fs');

var dbjsonData = require ("./db/db.json")
const dbjsonPath = "/db/db.json"

const app = express();
const PORT = process.env.PORT || 8080;

// const noteList = fs.readFileSync('/db/db.json');
// const addNote = fs.writeFileSync('/db/db.json')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get('/api/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});

app.post('/api/notes', function(req, res) {
    newNote = req.body;
    newNote.id = dbjsonData.length + 1
    dbjsonData.push(newNote)
    fs.writeFileSync(__dirname + dbjsonPath, JSON.stringify(dbjsonData), (err) => {})
    res.json(newNote);
});

app.delete('/api/notes/:id', function(req, res) {
    let id = parseInt(req.params.id);
    dbjsonData = dbjsonData.filter(note =>  note.id !== id)
    dbjsonData.forEach(note => note.id = dbjsonData.indexOf(note)+1)
    fs.writeFileSync(__dirname + dbjsonPath, JSON.stringify(dbjsonData), (err) => {})
    res.json(dbjsonData);
   
})

app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT)
});
