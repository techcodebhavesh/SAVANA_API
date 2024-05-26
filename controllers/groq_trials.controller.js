"use strict";
const Groq = require("groq-sdk");
const fs = require("fs");

const groq = new Groq({
    apiKey: "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"
});

async function getGroqChatCompletion(text) {

    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "tell me if teh content of this blog is ai generated  or not : "+ text
            }
        ],
        model: "llama3-70b-8192"
    });
}

module.exports = {
    getGroqChatCompletion
};
