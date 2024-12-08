const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample data to hold envelopes
let envelopes = [];

// POST: Create a new envelope
app.post('/envelopes', (req, res) => {
    const { name, budget } = req.body;

    if (!name || !budget || typeof budget !== 'number' || budget <= 0) {
        return res.status(400).json({ error: 'Invalid envelope data' });
    }

    const envelope = { id: envelopes.length + 1, name, budget };
    envelopes.push(envelope);

    res.status(201).json(envelope); // Respond with the created envelope
});

// GET: Retrieve all envelopes
app.get('/envelopes', (req, res) => {
    res.status(200).json(envelopes);
});

// GET: Retrieve a specific envelope by ID
app.get('/envelopes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const envelope = envelopes.find(env => env.id === id);

    if (!envelope) {
        return res.status(404).json({ error: 'Envelope not found' });
    }

    res.status(200).json(envelope);
});

// PUT: Update an envelope by ID
app.put('/envelopes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, budget } = req.body;

    const envelope = envelopes.find(env => env.id === id);
    if (!envelope) {
        return res.status(404).json({ error: 'Envelope not found' });
    }

    if (name) envelope.name = name;
    if (budget && typeof budget === 'number' && budget > 0) envelope.budget = budget;

    res.status(200).json(envelope);
});

// DELETE: Remove an envelope by ID
app.delete('/envelopes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = envelopes.findIndex(env => env.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Envelope not found' });
    }

    envelopes.splice(index, 1);
    res.status(204).send(); // No content response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
