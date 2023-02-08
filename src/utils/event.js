import dayjs from 'dayjs';

function getWeightForNullParam (a, b) {
  if (a === null && b === null) {
    return 0;
  }

  if (a === null) {
    return 1;
  }

  if (b === null) {
    return -1;
  }

  return null;
}

function sortDate (eventA, eventB) {
  const weight = getWeightForNullParam(eventA.start, eventB.start);

  return weight ?? dayjs(eventA.start).diff(dayjs(eventB.start));
}

function sortPrice (eventA, eventB) {
  const weight = getWeightForNullParam(eventA.price, eventB.price);

  return weight ?? eventB.price - eventA.price;
}

export { sortDate, sortPrice };
