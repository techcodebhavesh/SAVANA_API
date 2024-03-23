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

        // Display the extracted content and their sources
        majorText.forEach((content, index) => {
            console.log(`[${index + 1}] ${content.text} (Source: ${content.source})`);
        });

    } catch (error) {
        console.error('Error scraping content:', error);
    }
}

// Example usage
scrapeWebsite('https://medium.com/google-cloud/google-cloud-platform-technology-nuggets-february-16-29-2024-edition-cefbb10d858ccd');
