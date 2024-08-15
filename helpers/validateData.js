const validateBookData = (parameters) => {
  const { title, genre, price, stock, author } = parameters;
  let missingFields = [];

  if (!title || title === '') missingFields.push('title');
  if (!author || author === '') missingFields.push('author');
  if (!genre || genre === '') missingFields.push('genre');
  if (price == null) missingFields.push('price');
  if (stock == null) missingFields.push('stock');

  if (missingFields.length > 0) {
    throw new Error(`Required fields: ${missingFields.join(', ')}`);
  }
};

module.exports = validateBookData;
