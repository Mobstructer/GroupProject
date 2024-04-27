const express = require("express")
const app = express() 
const mysql = require ("mysql")

const PORT = 3000;

const db = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "newuser",
    database: "groupproject",
    port: "3306"
})
db.getConnection ( (err, connection)=> { 
    if (err) 
        throw (err) 
    console.log ("DB connected successful: " + connection.threadId)
})

app.use(express.json());
app.use(express.static('public'));

app.post('/submitData', (req, res) => {
    const {CityName, Population, AverageSalary, Area, CityID, CnID, StID} = req.body;
    const dataToInsert = {CityName, Population, AverageSalary, Area, CityID, CnID, StID};

    connection.query('INSERT INTO city SET ?', dataToInsert, (err, result) =>{
        if (err) {
            consolse.error('Error inserting data:', err.stack);
            res.status(500).json({ message: 'Error inserting data.'});
            return;
        }
        console.log('Inserted ' + result.affectedRows + ' row(s).');
        res.json({ message: 'Data inserted successfully.'});
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/index.html`);
})