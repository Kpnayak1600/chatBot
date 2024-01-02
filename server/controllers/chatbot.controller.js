
const express = require('express');
const chatbotService = require('../services/chatbot.service');

const router = express.Router();

router.post('/api/chatbot', async (req, res) => {
    const userMessage = req.body.message.trim();
    const botResponse = await chatbotService.getBotResponseFromDB(userMessage); // Fix here
    res.json({ message: botResponse });
});

router.get('/api/keywords', async (req, res) => {
    try {
        // Fetch all unique keywords from the database using the service
        const keywords = await chatbotService.getKeywordsFromDB();

        res.json({ keywords: keywords });
    } catch (error) {
        console.error('Error retrieving keywords from MongoDB:', error.message);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

module.exports = router;
