import { FilterType } from '../const';
import { isFuture } from './day.js';

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom, point.dateTo))
};


export { filter };
