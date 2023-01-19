export const names = [ 'Chamonix', 'Amsterdam', 'Geneva', 'New York', 'Berlin', 'Paris', 'Warsaw'];

export const mockDestinations = Array.from(Array(4), () => ({
  id: `${Math.random()}`,
  title: names[Math.floor(Math.random() * 10)],
  description: `Chamonix-Mont-Blanc (usually shortened to Chamonix) ${Math.floor(Math.random() * 10)} is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.`,
  pictures: [
    `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 1000)}`,
    `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 1000)}`,
    `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 1000)}`,
    `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * 1000)}`,
  ]
}));
