
const Response = require('../models/response.model');
const fs = require('fs').promises;
const path = require('path');

async function initializeDatabaseWithDummyData() {
    try {
        // Path to the initialResponses.json file
        const filePath = path.join(__dirname, '../data/initialResponse.json');

        // Read the content of the JSON file
        const fileContent = await fs.readFile(filePath, 'utf-8');

        // Parse the JSON content
        const initialResponses = JSON.parse(fileContent);

        // Delete all documents in the responses collection
        await Response.deleteMany({});

        // Insert initial responses
        await Response.insertMany(initialResponses);
        console.log('Initialized database with dummy data');
    } catch (error) {
        console.error('Error initializing database with dummy data:', error.message);
        throw error;
    }
}

async function getBotResponseFromDB(userMessage) {
    try {
        // Find all responses that have a keyword present in the user's message
        const responses = await Response.find({ keyword: { $in: userMessage.toLowerCase().split(' ') } });

        if (responses.length > 0) {
            // If at least one response is found, return the first one
            return responses[0].response;
        } else {
            return "I'm sorry, I didn't understand that. Please ask another question.";
        }
    } catch (error) {
        console.error('Error retrieving response from MongoDB:', error.message);
        return "An error occurred while processing your request.";
    }
}
async function getKeywordsFromDB() {
    try {
        // Fetch all unique keywords from the database
        const keywords = await Response.distinct('keyword');
        return keywords;
    } catch (error) {
        console.error('Error retrieving keywords from MongoDB:', error.message);
        throw error;
    }
}

module.exports = {
    initializeDatabaseWithDummyData,
    getBotResponseFromDB,
    getKeywordsFromDB,
};
