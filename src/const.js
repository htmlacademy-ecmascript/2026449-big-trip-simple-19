const EVENTS_TYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const DATE_FORMAT = {
  Full: 'YYYY-MM-DD',
  Day: 'MMM DD',
  Time: 'HH:mm',
  FormTime: 'DD/MM/YY HH:mm',
  FullTime: 'YYYY-MM-DDTHH:mm',
  Date: 'd/m/y H:i',
};

const FILTER_TYPE = {
  EVERTHING: 'everthing',
  FUTURE: 'future',
};

const SORT_TYPE = {
  DAY: 'day',
  PRICE: 'price'
};

export { EVENTS_TYPE, DATE_FORMAT, FILTER_TYPE, SORT_TYPE };
