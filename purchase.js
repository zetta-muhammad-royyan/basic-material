const discount = 0;
const tax = 0;

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
  price: 100000,
  stock: 5,
};

function calculateCredit(totalMonth, totalPrice) {
  credits = [];
  currentDate = new Date();

  baseAmount = Math.floor(totalPrice / totalMonth);
  remainder = totalPrice - baseAmount * (totalMonth - 1);

  for (i = 1; i <= totalMonth; i++) {
    year = currentDate.getFullYear();
    month = currentDate.getMonth() + i;
    lastDayOfMonth = new Date(year, month);

    credit = {
      dueDate: lastDayOfMonth.toISOString().split('T')[0],
      amount: i === totalMonth ? remainder : baseAmount,
    };

    credits.push(credit);
  }

  return credits;
}

purchase(book, 1, 3);
