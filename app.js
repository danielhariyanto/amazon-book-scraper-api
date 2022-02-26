const amazonScraper = require('./lib/index');
const express = require('express');
const app = express();

app.get('/', async (req,res) => {
  let bookString = req.query.bookString;
  bookString += ' paperback';
  console.log(bookString);
  
  (async () => {
    try {
        // Collect products from a bookString keyword
        // Default country is US
        const products = await amazonScraper.products({ keyword: bookString, number: 1 });
        asin_num = products.result[0].asin;
        console.log(asin_num)

        // Get single product details by using ASIN id
        //const product_by_asin = await amazonScraper.asin({ asin: asin_num, country: 'US' });
        //res.send(product_by_asin.result[0]);

        // Get raw HTML code
        const rawHTML = await amazonScraper.raw({ asin: asin_num, country: 'US' });
        res.send(rawHTML);

    } catch (error) {
        res.send(error);
    }
})();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
