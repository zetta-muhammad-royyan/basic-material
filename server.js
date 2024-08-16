const express = require('express');
const bodyParser = require('body-parser');
const { books } = require('./books.js');
const { calculateCredit, calculateInterestPrice } = require('./helper.js');
const { auth } = require('./middlewares/auth.js');

// PARAMETERS
const DISCOUNT = 0;
const TAX = 0;

const app = express();
app.use(bodyParser.json());

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

  let allTerms = await calculateCredit(term, normalPrice);
  let distinctTerm = new Set();
  let termByDate = new Map();
  allTerms.forEach((term) => {
    distinctTerm.add(term.amount);
    termByDate.set(term.dueDate, { amount: term.amount, paid: false });
  });

  // hardcode one term data to get paid
  let entry = termByDate.get(allTerms[0].dueDate);
  entry.paid = true;
  termByDate.set(allTerms[0].dueDate, entry);

  return res.status(200).json({
    normalPrice: normalPrice,
    priceWithCredit: calculateInterestPrice(term, normalPrice),
    allTerms: allTerms,
    distinctTerm: Array.from(distinctTerm),
    termByDate: Array.from(termByDate, ([key, value]) => ({ [key]: value })),
  });
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
