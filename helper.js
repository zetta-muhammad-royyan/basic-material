const calculateCredit = (term, totalPrice) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let credits = [];
      let currentDate = new Date();
      for (let i = 1; i <= term; i++) {
        let dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, currentDate.getDate());
        let credit = {
          dueDate: dueDate.toISOString().split('T')[0],
          amount: calculateInterestPrice(term, totalPrice) / term,
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
  return interestPrice + priceStart;
};

module.exports = { calculateCredit, calculateInterestPrice };
