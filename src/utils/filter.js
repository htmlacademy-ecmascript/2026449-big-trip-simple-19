import { FilterType } from '../const';

const filter = {
  [FilterType.EVERTHING]: (events) => events.filter((event) => !event.length),
  [FilterType.FUTURE]: (events) => events.filter((event) => new Date().getTime() <= new Date(event.end).getTime()),
};

export { filter };
