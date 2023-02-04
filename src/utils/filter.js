import { FILTER_TYPE } from '../const';

const filter = {
  [FILTER_TYPE.EVERTHING]: (events) => events.filter((event) => !event.length),
  [FILTER_TYPE.FUTURE]: (events) => events.filter((event) => new Date().getTime() <= new Date(event.end).getTime()),
};

export { filter };
