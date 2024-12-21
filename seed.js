
// const { MongoClient } = require('mongodb');

// const students = [
//     { id: '101', name: 'Alice', score: 95 },
//     { id: '102', name: 'Bob', score: 85 },
//     { id: '103', name: 'Charlie', score: 92 },
//     { id: '104', name: 'Daisy', score: 88 },
//     { id: '105', name: 'Eve', score: 91 },
//     { id: '106', name: 'Frank', score: 78 },
//     { id: '107', name: 'Grace', score: 82 },
//     { id: '108', name: 'Hank', score: 89 },
//     { id: '109', name: 'Ivy', score: 73 },
//     { id: '110', name: 'Jack', score: 85 },
//     { id: '111', name: 'Karen', score: 92 },
//     { id: '112', name: 'Leo', score: 97 },
//     { id: '113', name: 'Mona', score: 84 },
//     { id: '114', name: 'Nina', score: 80 },
//     { id: '115', name: 'Oscar', score: 87 },
//     { id: '116', name: 'Paul', score: 90 },
//     { id: '117', name: 'Quincy', score: 74 },
//     { id: '118', name: 'Rita', score: 88 },
//     { id: '119', name: 'Sam', score: 76 },
//     { id: '120', name: 'Tina', score: 94 },
//     { id: '121', name: 'Uma', score: 83 },
//     { id: '122', name: 'Victor', score: 81 },
//     { id: '123', name: 'Wendy', score: 86 },
//     { id: '124', name: 'Xander', score: 75 },
//     { id: '125', name: 'Yara', score: 93 },
//     { id: '126', name: 'Zack', score: 77 }
// ];

// // Calculate ranks
// const rankedStudents = students
//     .sort((a, b) => b.score - a.score) // Sort by score descending
//     .map((student, index) => ({ ...student, rank: index + 1 })); // Add rank

// const uri = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(uri);

// (async function seedDatabase() {
//     try {
//         await client.connect();
//         const db = client.db('studentDB');
//         const collection = db.collection('students');
//         await collection.deleteMany({}); // Clear existing data
//         await collection.insertMany(rankedStudents);
//         console.log('Data seeded successfully with ranks');
//     } catch (error) {
//         console.error('Error seeding data:', error);
//     } finally {
//         await client.close();
//     }
// })();
const { MongoClient } = require('mongodb');

const students = [
    { id: '101', name: 'Alice', score: 95 },
    { id: '102', name: 'Bob', score: 85 },
    { id: '103', name: 'Charlie', score: 92 },
    { id: '104', name: 'Daisy', score: 88 },
    { id: '105', name: 'Eve', score: 91 },
    { id: '106', name: 'Frank', score: 78 },
    { id: '107', name: 'Grace', score: 82 },
    { id: '108', name: 'Hank', score: 89 },
    { id: '109', name: 'Ivy', score: 73 },
    { id: '110', name: 'Jack', score: 85 },
    { id: '111', name: 'Karen', score: 92 },
    { id: '112', name: 'Leo', score: 97 },
    { id: '113', name: 'Mona', score: 84 },
    { id: '114', name: 'Nina', score: 80 },
    { id: '115', name: 'Oscar', score: 87 },
    { id: '116', name: 'Paul', score: 90 },
    { id: '117', name: 'Quincy', score: 74 },
    { id: '118', name: 'Rita', score: 88 },
    { id: '119', name: 'Sam', score: 76 },
    { id: '120', name: 'Tina', score: 94 },
    { id: '121', name: 'Uma', score: 83 },
    { id: '122', name: 'Victor', score: 81 },
    { id: '123', name: 'Wendy', score: 86 },
    { id: '124', name: 'Xander', score: 75 },
    { id: '125', name: 'Yara', score: 93 },
    { id: '126', name: 'Zack', score: 77 }
];

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

(async function seedDatabase() {
    try {
        await client.connect();
        const db = client.db('studentDB');
        const collection = db.collection('students');
        await collection.deleteMany({});
        await collection.insertMany(students);
        console.log('Data seeded successfully.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await client.close();
    }
})();
