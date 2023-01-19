import { getRandomEvents } from '../mock/event.js';

const EVENTS_COUNT = 5;

export default class EventModel {
  #event = Array.from({ length: EVENTS_COUNT }, getRandomEvents);

  get event() {
    return this.#event;
  }
}
