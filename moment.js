const moment = require('moment');

function calculateDateTime(dateString, dateObj) {
  console.log('Current date and time :', moment().format('YYYY/MM/DD HH:mm:ss'));

  const dateFromString = moment(dateString);
  console.log('Parse string to date adn time :', dateFromString.format('YY/MM/DD HH:mm:ss'));

  const dateFromObj = moment(dateObj);
  console.log('Parse object to date and time :', dateFromObj.format('DD MM YYYY HH:mm:ss'));

  const utcTime = moment().utc();
  console.log('UTC Time :', utcTime.format('DD-MM-YYYY HH:mm:ss'));

  const isValidDateString = moment(dateString, 'DD-MM-YYYY', false).isValid();
  console.log('Is parameter string of date valid:', isValidDateString);
}

calculateDateTime('2024-08-01 00:00:00', { year: 2024, month: 7, day: 5, hour: 15, minute: 30, second: 0 });
