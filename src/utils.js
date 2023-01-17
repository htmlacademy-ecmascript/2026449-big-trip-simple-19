import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const formatDate = (date, format) => dayjs(date).format(format);

export { getRandomArrayElement, formatDate };
