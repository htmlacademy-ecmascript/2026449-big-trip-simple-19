import { filter } from '../utils/filter.js';

function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterName, filterTasks]) => ({
      name: filterName,
      count: filterTasks(events).length,
    }),
  );
}

export { generateFilter };
