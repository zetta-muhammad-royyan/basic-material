const calculateCredit = (totalMonth, totalPrice) => {
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
};

module.exports = { calculateCredit };
