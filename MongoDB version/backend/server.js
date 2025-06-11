import express from 'express';
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

config(); // Load environment variables

// MongoDB Connection
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Password-Manager';

await client.connect();
console.log('Connected to MongoDB');
const db = client.db(dbName);
const collection = db.collection('passwords');

app.use(bodyParser.json());
app.use(cors());

// ✅ Get all passwords
app.get('/', async (req, res) => {
    try {
        const passwords = await collection.find({}).toArray();
        res.json(passwords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Save a password
app.post('/', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body is empty" });
        }

        const result = await collection.insertOne(req.body);
        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Delete a password
app.delete('/', async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: "Missing password ID" });
        }

        const result = await collection.deleteOne({ id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Password not found" });
        }

        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
