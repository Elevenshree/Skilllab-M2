// Updated server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');

// Set up Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Configuration
const uri = 'mongodb://127.0.0.1:27017'; // MongoDB connection URI
const client = new MongoClient(uri);
let db, studentsCollection;

(async function connectToDb() {
    try {
        await client.connect();
        db = client.db('studentDB'); // MongoDB Database name
        studentsCollection = db.collection('students'); // MongoDB Collection name
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
})();

// API: Get all students (sorted by field and order)
app.get('/students', async (req, res) => {
    try {
        const { sortBy = 'score', order = 'desc' } = req.query;
        const sortOrder = order === 'asc' ? 1 : -1;

        const students = await studentsCollection
            .find()
            .sort({ [sortBy]: sortOrder })
            .toArray();

        const rankedStudents = students.map((student, index) => ({
            ...student,
            rank: index + 1,
        }));

        res.json(rankedStudents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
});

// API: Get student by ID
app.get('/students/:id', async (req, res) => {
    try {
        const student = await studentsCollection.findOne({ id: req.params.id });
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
});

// API: Insert or Update Student
app.post('/students', async (req, res) => {
    try {
        const student = req.body;
        if (!student.id || !student.name || student.score === undefined) {
            return res.status(400).json({ message: 'Invalid student data.' });
        }

        const result = await studentsCollection.updateOne(
            { id: student.id },
            { $set: student },
            { upsert: true }
        );

        res.json({ message: 'Student saved successfully.', result });
    } catch (error) {
        res.status(500).json({ message: 'Error saving student', error });
    }
});
// API: Export students as CSV
app.get('/students/export', async (req, res) => {
    try {
        const students = await studentsCollection.find().toArray();

        if (!students || students.length === 0) {
            return res.status(404).json({ message: 'No students found.' });
        }

        const csvHeader = 'Rank,ID,Name,Score\n';
        const csvRows = students
            .map((student, index) => `${index + 1},${student.id},${student.name},${student.score}`)
            .join('\n');

        const csvContent = csvHeader + csvRows;
        const filePath = path.join(__dirname, 'students.csv');

        // Write CSV file
        fs.writeFileSync(filePath, csvContent, 'utf8');

        // Download the file
        res.download(filePath, 'students.csv', (err) => {
            if (err) {
                console.error('Error during file download:', err);
                res.status(500).send('Error exporting data');
            } else {
                // Uncomment the following line to delete the file after download
                // fs.unlinkSync(filePath);
            }
        });
    } catch (error) {
        console.error('Error exporting data:', error);
        res.status(500).json({ message: 'Error exporting data', error });
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});