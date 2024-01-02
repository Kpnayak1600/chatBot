
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db.config');
const chatbotService = require('./services/chatbot.service'); // Import chatbotService
const chatbotRoutes = require('./controllers/chatbot.controller');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

db.once('open', async () => {
    await chatbotService.initializeDatabaseWithDummyData();
});

app.use(chatbotRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
