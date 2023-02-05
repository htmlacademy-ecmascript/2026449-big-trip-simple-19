import { EVENTS_TYPE } from '../const.js';
import { getRandomArrayElement } from '../utils/common.js';
import { getRandom } from '../utils/common.js';

const mockEvents = EVENTS_TYPE.map((event, i) => ({
  type: event,
  destination: getRandom(1, 4),
  start: `2021-${getRandom(1, 12)}-${getRandom(1, 31)} 00:00:00`,
  end: `202${getRandom(2, 3)}-${getRandom(1, 12)}-${getRandom(1, 31)} 00:00:00`,
  price: Math.floor(Math.random() * 1000),
  id: i,
  offers: [getRandom(2, 3), getRandom(2, 3)]
}));

function getRandomEvents() {
  return getRandomArrayElement(mockEvents);
}

export { getRandomEvents, mockEvents };
