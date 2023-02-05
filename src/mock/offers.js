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

// const mockOffers = Array.from(Array(5), (_, i) => ({
//   id: i,
//   title: offers[Math.floor(Math.random() * 10)],
//   price: Math.floor(Math.random() * 1000)
// }));

const mockOffers = EVENTS_TYPE.map((type) => ({
  type: type,
  offers: Array.from({length: 4}, (_, index) => ({
    id: index,
    title: `offer ${Math.round(Math.random() * 1000)}`,
    price: Math.floor(Math.random() * 1000)
  }))
}));

export { mockOffers, offers };
