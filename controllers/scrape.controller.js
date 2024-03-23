const axios = require('axios');
const cheerio = require('cheerio');

const scrapeBlog= async(req, res) =>{
    try {
        const  url =req.body.url;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Example: Scraping all <p> elements inside <article> tag
        const content = $('article').find('p').text();

        console.log(content);
    } catch (error) {
        console.error('Error scraping content:', error);
    }
}

// Example usage
//scrapeBlog('https://medium.com/google-cloud/google-cloud-platform-technology-nuggets-february-16-29-2024-edition-cefbb10d858c');



/*async function scrapeBlog(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Example: Scraping all <p> elements inside <article> tag
        const content = $('article').find('p').text();

        console.log(content);
    } catch (error) {
        console.error('Error scraping content:', error);
    }
}

// Example usage
scrapeBlog('https://medium.com/google-cloud/google-cloud-platform-technology-nuggets-february-16-29-2024-edition-cefbb10d858c');
**/