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

const mockOffers = Array.from(Array(5), () => ({
  id: `${Math.random()}`,
  title: offers[Math.floor(Math.random() * 10)],
  price: Math.floor(Math.random() * 1000)
}));

export { mockOffers, offers };
