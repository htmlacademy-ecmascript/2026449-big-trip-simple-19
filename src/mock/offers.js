import { EVENTS_TYPE } from '../const.js';

const offers = [
  'Upgrade to business',
  'Upgrade to comfort',
  'Upgrade to first class',
  'Travel with kids',
  'Travel with pets',
  'Luxury',
  'Elite',
  'Comfort',
  'Comfort+',
  'People with disabilities',
];

const mockOffers = EVENTS_TYPE.map((type) => ({
  type: type,
  offers: Array.from({length: 9}, (_, index) => ({
    id: index + 1,
    title: `offer ${Math.round(Math.random() * 1000)}`,
    price: Math.floor(Math.random() * 1000)
  }))
}));

export { mockOffers, offers };
