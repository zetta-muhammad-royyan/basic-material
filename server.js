const express = require('express');
const bodyParser = require('body-parser');
const { books } = require('./books.js');
const { calculateCredit, calculateInterestPrice } = require('./helper.js');
const { auth } = require('./middlewares/auth.js');

// PARAMETERS
const DISCOUNT = 20;
const TAX = 10;

const app = express();
app.use(bodyParser.json());

const someAsyncFunction = async () => {
  for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i + 1}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

app.get('/endpoint1', async (req, res) => {
  await someAsyncFunction();
  console.log('endpoint 1 complete');
  return res.send('endpoint 1 complete');
});

app.get('/endpoint2', async (req, res) => {
  someAsyncFunction();
  console.log('endpoint 2 complete');
  return res.send('endpoint 2 complete');
});

app.post('/purchase', auth, async (req, res) => {
  const { bookID, term, quantity } = req.body;

  let book = books.find((book) => book.id === bookID);
  if (!book) {
    return res.status(404).json({ message: `Cannot find book with id ${bookID}` });
  }

  if (quantity > book.stock) {
    return res.status(400).json({ message: `Maximum purchase is ${book.stock}` });
  }

  let priceStart = quantity * book.price;
  let discountAmount = (priceStart * DISCOUNT) / 100;
  let taxAmount = (priceStart * TAX) / 100;

  let normalPrice = priceStart - discountAmount + taxAmount;

  return res.status(200).json({
    normalPrice: normalPrice,
    priceWithCredit: calculateInterestPrice(term, normalPrice),
    credits: await calculateCredit(term, normalPrice),
  });
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
