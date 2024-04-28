const express = require("express");
const app = express();
const mysql = require("mysql");

const PORT = 3000;

const db = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "newuser",
    database: "groupproject",
    port: "3306"
});

db.getConnection((err, connection) => {
    if (err)
        throw (err);
    console.log("DB connected successfully: " + connection.threadId);
    connection.release();
});

app.use(express.json());
app.use(express.static('public'));

// Endpoint to fetch data from MySQL
app.get('/getDataFromMySQL', (req, res) => {
    db.query('SELECT * FROM state; SELECT * FROM county; SELECT * FROM city', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ message: 'Error fetching data.' });
            return;
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/homepage.html`);
});
