import { EVENTS_TYPE } from '../const.js';
import { getRandomArrayElement } from '../utils/common.js';
import { getRandom } from '../utils/common.js';
import { nanoid } from 'nanoid';
import { mockOffers } from './offers.js';

const mockEvents = EVENTS_TYPE.map((event, i) => ({
  type: event,
  id: i + 1,
  basePrice: Math.floor(Math.random() * 1000),
  dateFrom: new Date(`2021-${getRandom(1, 12)}-${getRandom(1, 31)}`),
  dateTo: new Date(`202${getRandom(2, 3)}-${getRandom(1, 12)}-${getRandom(1, 31)}`),
  destination: getRandom(1, 11),
  uniqueId: nanoid(),
  offers: mockOffers.find((elem) => elem.type === event).offers,
}));

const getRandomEvents = () => getRandomArrayElement(mockEvents);

export { getRandomEvents, mockEvents };
