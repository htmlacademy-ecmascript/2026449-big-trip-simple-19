import { EVENTS_TYPE } from '../const.js';
import { mockOffers } from './offers.js';
import { getRandomArrayElement } from '../utils.js';

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mockEvents = EVENTS_TYPE.map((event) => ({
  type: event,
  destination: getRandom(1, 4),
  start: '2022-01-01 00:00:00',
  end: '2022-01-01 05:00:00',
  price: Math.floor(Math.random() * 1000),
  offers: getRandomArrayElement(mockOffers)
}));

function getRandomEvents() {
  return getRandomArrayElement(mockEvents);
}

export { getRandomEvents, mockEvents };
