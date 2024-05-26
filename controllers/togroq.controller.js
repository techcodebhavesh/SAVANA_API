const { getGroqChatCompletion } = require("./groq_trials.controller.js");
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extract the major text content from the website
        const majorText = $('p, h1, h2, h3, h4, h5, h6').map((index, element) => {
            // Get the text content of the element
            const text = $(element).text().trim();
            // Get the parent tag of the element
            const parentTag = $(element).parent().get(0).tagName.toLowerCase();
            // Return the text content along with the parent tag
            return { text, source: parentTag };
        }).get();

        // Combine all the text content into a single string
        const combinedText = majorText.map(content => content.text).join('\n');

        return combinedText;

    } catch (error) {
        console.error('Error scraping content:', error);
        throw new Error('Error scraping content');
    }
}

const processEntriesHandler2 = async (req, res) => {
    try {
        const { url } = req.body; // Assuming the URL is provided in the "url" field of the request body

        if (!url) {
            res.status(400).send('URL is required');
            return;
        }

        console.log('Scraping URL:', url);

        // Scrape the website to extract the content
        const text = await scrapeWebsite(url);
        console.log('Scraped content:', text);

        // Pass the scraped content to the GROQ function
        const completion = await getGroqChatCompletion(text);
        const textResult = completion.choices[0]?.message?.content || "No content received";
        console.log(textResult);
        res.send(JSON.stringify(textResult));
    } catch (err) {
        console.error('Error processing entry:', err);
        res.status(500).send(err.message);
    }
};

module.exports = {
    processEntriesHandler2
};
