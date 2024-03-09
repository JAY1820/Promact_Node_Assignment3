const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'page', 'index.html');
    res.sendFile(indexPath);
});

// Route for the users page
app.get('/users', (req, res) => {
    const usersPath = path.join(__dirname, 'page', 'users.html');
    res.sendFile(usersPath);
});

// Route for getting the users data
app.get('/users/data', (req, res) => {
    try {
        const users = fs.readFileSync('users.txt', 'utf-8').split('\n');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for the create page
app.get('/create', (req, res) => {
    const createPath = path.join(__dirname, 'page', 'create.html');
    res.sendFile(createPath);
});

// Route for adding a user
app.post('/add', (req, res) => {
    const userName = req.body.userName;
    fs.appendFileSync('users.txt', userName + '\n');
    res.redirect('/users');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
