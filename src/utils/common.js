function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomArrayElement, getRandom };
