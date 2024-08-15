const discount = 20;
const tax = 5;

function purchase(bookDetails, purchasedBook, creditMonth) {
  let { price, stock } = bookDetails;

  if (purchasedBook > stock) {
    console.log('Maximum purchase is ' + stock);
  }

  priceStart = 0;
  for (i = 0; i < purchasedBook; i++) {
    if (stock < 1) {
      break;
    }

    priceStart += price;
    stock--;
  }

  priceDiscount = (priceStart * discount) / 100;
  priceAfterDiscount = priceStart - priceDiscount;

  amountTax = (priceAfterDiscount * tax) / 100;
  finalPrice = priceAfterDiscount + amountTax;

  if (stock > 0) {
    console.log(`Stock is still available ${stock} you can buy it again`);
  }

  console.log('Total Price : ' + finalPrice);

  credits = calculateCredit(creditMonth, finalPrice);
  console.log(credits);
}

let book = {
  title: 'A Dance with Dragons',
  price: 150000,
  stock: 5,
};

function calculateCredit(totalMonth, totalPrice) {
  credits = [];
  currentDate = new Date();
  for (i = 1; i <= totalMonth; i++) {
    dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, currentDate.getDate());
    credit = {
      dueDate: dueDate.toISOString().split('T')[0],
      amount: Math.ceil(totalPrice / totalMonth),
    };

    credits.push(credit);
  }

  return credits;
}

purchase(book, 3, 9);
