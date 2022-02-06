const express = require('express');
const app = express();
const port = 3000;
const words = require('./data/words.json');
const wordsAmount = words.length;

app.get('/random', (req, res) => {
    res.send(words[Math.ceil(Math.random() * wordsAmount)])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})