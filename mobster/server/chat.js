const {OpenAI} = require("openai");
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
});

const getChatCompletion = async (messages) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
            max_tokens: 4096,
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        throw error;
    }
};

module.exports = {
    getChatCompletion,
};