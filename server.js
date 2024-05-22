import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "nodeexpress"
})

app.get('/', (req, res) => {
    const sqlSelect = "SELECT * FROM students";
    db.query(sqlSelect, (err, result) => {
        if (err) return res.json({ message: "Error Inside Server" });
        return res.json(result);

    })
})

app.post('/addstudents', (req, res) => {
    const sqlInsert = "INSERT INTO students (`name`, `email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sqlInsert, [values], (err, result) => {
        if (err) return res.json({ message: "Error Inside Server" });
        return res.json(result);

    })
})

app.get('/read/:id', (req, res) => {
    const sqlRead = "SELECT * FROM students WHERE id = ?";
    const id = req.params.id
    db.query(sqlRead, [id], (err, result) => {
        if (err) return res.json({ message: "Error Inside Server" });
        return res.json(result);

    })
})

app.put('/update/:id', (req, res) => {
    const sqlUpdate = 'UPDATE students SET `name` = ?, `email` = ? WHERE id = ?';
    const id = req.params.id
    db.query(sqlUpdate, [req.body.name, req.body.email, id], (err, result) => {
        if (err) return res.json({ message: "Error updating student: " + err.message });
        return res.json(result);
    })
})
app.use('/delete/:id', (req, res) => {
    const sqlDelete = 'DELETE FROM students WHERE id = ?';
    const id = req.params.id
    db.query(sqlDelete, [id], (err, result) => {
        if (err) return res.json({ message: "Error deleting student: " + err.message });
        return res.json(result);
    })
})
app.listen(8000, () => {
    console.log("Server is running on port 8000");
})