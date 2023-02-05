import { mockEvents } from '../mock/event.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';

export default class EventsModel {
  #events = mockEvents;
  #destinations = mockDestinations;
  #offersByType = mockOffers;

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;
  }
}
