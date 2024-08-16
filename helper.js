const calculateCredit = (term, totalPrice) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let credits = [];
      let currentDate = new Date();

      let finalPrice = calculateInterestPrice(term, totalPrice);
      let baseAmount = Math.floor(finalPrice / term);
      let remainder = finalPrice - baseAmount * (term - 1);

      for (let i = 1; i <= term; i++) {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + i;
        let lastDayOfMonth = new Date(year, month);

        let credit = {
          dueDate: lastDayOfMonth.toISOString().split('T')[0],
          amount: i === term ? remainder : baseAmount,
        };

        credits.push(credit);
      }

      resolve(credits);
    }, 200);
  });
};

const calculateInterestPrice = (term, priceStart) => {
  let interestRate = 0;

  if (term <= 3) {
    interestRate = 10;
  } else {
    interestRate = 10;
    let additionalPeriods = Math.ceil((term - 3) / 3);
    interestRate += additionalPeriods * 5;
  }

  let interestPrice = (priceStart * interestRate) / 100;
  // return interestPrice + priceStart;
  return priceStart;
};

module.exports = { calculateCredit, calculateInterestPrice };
