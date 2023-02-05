import { FILTER_TYPE } from '../const';
import { isFuture } from './day.js';

const filter = {
  [FILTER_TYPE.EVERTHING]: (events) => events.filter((event) => !event.length),
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
};


export { filter };
