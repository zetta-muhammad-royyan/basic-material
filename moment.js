const moment = require('moment');

function calculateDate(dateString) {
  const plusHour = moment(dateString).add(2, 'h');
  console.log('Added Hour :', plusHour.format('DD/MM/YYYY HH:mm:ss'));

  const plusDay = moment(dateString).add(5, 'd');
  console.log('Added Day :', plusDay.format('DD/MM/YYYY HH:mm:ss'));

  const plusWeek = moment(dateString).add(1, 'w');
  console.log('Added Week :', plusWeek.format('DD/MM/YYYY HH:mm:ss'));

  const minusDay = moment(dateString).subtract(5, 'd');
  console.log('Subtracted Day :', minusDay.format('DD/MM/YYYY HH:mm:ss'));

  const startOfWeek = moment(dateString).startOf('week');
  console.log('Start of week:', startOfWeek.format('YYYY-MM-DD HH:mm:ss'));

  const endOfMonth = moment(dateString).endOf('month');
  console.log('End of month:', endOfMonth.format('YYYY-MM-DD HH:mm:ss'));
}

calculateDate('2024-02-05');
