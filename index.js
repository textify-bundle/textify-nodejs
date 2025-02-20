const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for click counts
const clickCounts = new Map();

// Start session
app.post('/start-session', (req, res) => {
    const { userName, projectName } = req.body;
    const key = `${userName}_${projectName}`;
    
    if (!clickCounts.has(key)) {
        clickCounts.set(key, 0);
    }
    
    res.json({ message: 'Session started', clicks: clickCounts.get(key) });
});

// Register click
app.post('/click', (req, res) => {
    const { userName, projectName } = req.body;
    const key = `${userName}_${projectName}`;
    
    if (!clickCounts.has(key)) {
        clickCounts.set(key, 0);
    }
    
    const newCount = clickCounts.get(key) + 1;
    clickCounts.set(key, newCount);
    
    res.json({ clicks: newCount });
});

// Get clicks
app.get('/clicks', (req, res) => {
    const { userName, projectName } = req.query;
    const key = `${userName}_${projectName}`;
    
    const clicks = clickCounts.get(key) || 0;
    res.json({ clicks });
});

// End session
app.post('/end-session', (req, res) => {
    const { userName, projectName } = req.body;
    const key = `${userName}_${projectName}`;
    
    const clicks = clickCounts.get(key) || 0;
    res.json({ 
        message: 'Session ended',
        clicks: clicks 
    });
});

app.listen(port, () => {
    console.log(`Click counter service running on port ${port}`);
});
