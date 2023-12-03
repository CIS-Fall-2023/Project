
// Load necessary modules
var express = require('express');
var app = express();
const axios = require('axios');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'cis3368.celgv0vmzbhu.us-east-1.rds.amazonaws.com',
    user : 'admin',
    password : 'Supersoaker51415',
    database : 'cis3368db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Index page
app.get('/', function(req, res) {
    res.render('pages/login');
});



// Render your CRUD pages - floor.ejs, resident.ejs, room.ejs
// Define routes for CRUD pages

// Floor page route


app.post('/Floor', (req, res) => {
    const { id, level, name } = req.body;
    const newFloor = { id: parseInt(id), level: parseInt(level), name };
    

    connection.query('INSERT INTO floor SET ?', newFloor, (error, results) => {
        if (error) {
            console.error('Error adding floor:', error);
            res.status(500).json({ error: 'Error adding floor' });
            return;
        }
        res.redirect('/Floor');
    });
});

// Example GET request to fetch data from MySQL
app.get('/Floor', (req, res) => {
    connection.query('SELECT * FROM floor', (error, results) => {
        if (error) {
            console.error('Error fetching floor:', error);
            res.status(500).json({ error: 'Error fetching floor' });
            return;
        }
        res.render('pages/Floor', { floors: results }); // Render the Floor view with fetched data
    });
});


app.delete('=floors/:id', (req, res) => {
    const floorId = req.params.id;

    connection.query('DELETE FROM floor WHERE id = ?', floorId, (error, results) => {
        if (error) {
            console.error('Error deleting floor:', error);
            res.status(500).json({ error: 'Error deleting floor' });
            return;
        }
        res.status(200).json({ message: 'Floor deleted successfully' });
    });
});

// Resident page route
// Example POST request handling to add data to the residents table
app.post('/Resident', (req, res) => {
    const { id, firstname, lastname, age, room } = req.body;
    const newResident = {
        id: parseInt(id),
        firstname,
        lastname,
        age: parseInt(age),
        room: parseInt(room)
    };

    connection.query('INSERT INTO resident SET ?', newResident, (error, results) => {
        if (error) {
            console.error('Error adding resident:', error);
            res.status(500).json({ error: 'Error adding resident' });
            return;
        }
        res.redirect('/Resident');
    });
});

// Example GET request to fetch data from the residents table
app.get('/Resident', (req, res) => {
    connection.query('SELECT * FROM resident', (error, results) => {
        if (error) {
            console.error('Error fetching resident:', error);
            res.status(500).json({ error: 'Error fetching resident' });
            return;
        }
        res.render('pages/Resident', { residents: results }); // Render the Resident view with fetched data
    });
});

// DELETE request to delete a resident
app.delete('Resident/:id', (req, res) => {
    const residentId = req.params.id;

    connection.query('DELETE FROM resident WHERE id = ?', residentId, (error, results) => {
        if (error) {
            console.error('Error deleting resident:', error);
            res.status(500).json({ error: 'Error deleting resident' });
            return;
        }
        res.status(200).json({ message: 'Resident deleted successfully' });
    });
});


// Room page route
// Example POST request handling to add data to the rooms table
app.post('Room', (req, res) => {
    const { id, capacity, number, floor } = req.body;
    const newRoom = {
        id: parseInt(id),
        capacity: parseInt(capacity),
        number: parseInt(number),
        floor: parseInt(floor)
    };

    connection.query('INSERT INTO rooms SET ?', newRoom, (error, results) => {
        if (error) {
            console.error('Error adding room:', error);
            res.status(500).json({ error: 'Error adding room' });
            return;
        }
        res.render('pages/Room', { rooms: results });
    });
});

// Example GET request to fetch data from the rooms table
app.get('/Room', (req, res) => {
    connection.query('SELECT * FROM room', (error, results) => {
        if (error) {
            console.error('Error fetching room:', error);
            res.status(500).json({ error: 'Error fetching room' });
            return;
        }
        res.render('pages/Room', { rooms: results }); // Render the Room view with fetched data
    });
});

// DELETE request to delete a room
app.delete('Rooms/:id', (req, res) => {
    const roomId = req.params.id;

    connection.query('DELETE FROM room WHERE id = ?', roomId, (error, results) => {
        if (error) {
            console.error('Error deleting room:', error);
            res.status(500).json({ error: 'Error deleting room' });
            return;
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    });
});

app.listen(4000);
console.log('4000 is the magic port');
