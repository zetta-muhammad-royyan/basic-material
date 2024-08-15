const moment = require('moment');

function calculateDate(dateString1, dateString2) {
  const indonesianFormat = moment(dateString1);
  console.log('Date in Indonesian Format :', indonesianFormat.format('DD MM YYYY'));

  const weeksDifference = moment(dateString1).diff(moment(dateString2), 'weeks');
  console.log('Differentiation in weeks:', weeksDifference);

  const isSameOrAfter = moment(dateString1).isSameOrAfter(moment(dateString2));
  console.log('Is parameter 1 same or after parameter 2:', isSameOrAfter);

  const isCurrentDateBetween = moment('2024-08-01').isBetween(moment(dateString1), moment(dateString2));
  console.log('Is current date between parameter 1 & parameter 2:', isCurrentDateBetween);
}

calculateDate('2024-08-05', '2024-07-11');
