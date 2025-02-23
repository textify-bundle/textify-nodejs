const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for click counts
const userClicks = new Map();

// Start session
app.post('/start-session', (req, res) => {
    const { userName } = req.body;
    
    if (!userClicks.has(userName)) {
        userClicks.set(userName, 0);
    }
    
    res.json({ 
        message: 'Session started', 
        clicks: userClicks.get(userName) 
    });
});

// Register click
app.post('/click', (req, res) => {
    const { userName } = req.body;
    
    if (!userClicks.has(userName)) {
        userClicks.set(userName, 0);
    }
    
    const newCount = userClicks.get(userName) + 1;
    userClicks.set(userName, newCount);
    
    res.json({ clicks: newCount });
});

// Get clicks
app.get('/clicks', (req, res) => {
    const { userName } = req.query;
    const clicks = userClicks.get(userName) || 0;
    res.json({ clicks });
});

// End session
app.post('/end-session', (req, res) => {
    const { userName } = req.body;
    const clicks = userClicks.get(userName) || 0;
    
    res.json({ 
        message: 'Session ended',
        clicks: clicks 
    });
});

app.listen(port, () => {
    console.log(`Click counter service running on port ${port}`);
});
