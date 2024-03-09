const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route for the users page
app.get('/users', (req, res) => {
    res.sendFile(__dirname + '/users.html');
});

// Route for getting the users data
app.get('/users/data', (req, res) => {
    const users = fs.readFileSync('users.txt', 'utf-8').split('\n');
    res.json(users);
});

// Route for the create page
app.get('/create', (req, res) => {
    res.sendFile(__dirname + '/create.html');
});

// Route for adding a user
app.post('/add', (req, res) => {
    const userName = req.body.userName;
    fs.appendFileSync('users.txt', userName + '\n');
    res.redirect('/users');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
