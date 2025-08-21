// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/digibook', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', { username: String, password: String });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.redirect('/main.html');
  } else {
    res.send('Login failed');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));