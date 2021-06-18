const express = require('express');
const path = require('path');
const fs = require('fs')


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));



app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data))
    })
})

app.post('/api/notes', (req, res) => {
    const newEntry = req.body

    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        
        entries = (JSON.parse(data))
        entries.push(newEntry)
        

        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(entries), function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Note has been saved!")
            }
    
        })
    
        res.json(entries)
    })  

});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));