import { createElement } from '../render.js';
import { formatDate } from '../utils';
import { DATE_FORMAT } from '../const.js';
import { names } from '../mock/destinations.js';
import { getRandomArrayElement } from '../utils.js';

function createOfferTemplate(event) {
  if (!event.offers || !Object.keys(event.offers).length) {
    return '<li class="event__offer">No additional offers</li>';
  }

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${event.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${event.price}</span>
    </li>`
  );
}

function createEventsTemplate(event) {
  const title = `${event.type} ${getRandomArrayElement(names)}`;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatDate(event.start, DATE_FORMAT.FullTime)}">
          ${formatDate(event.start, DATE_FORMAT.Day)}
        </time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDate(event.start, DATE_FORMAT.FullTime)}">
              ${formatDate(event.start, DATE_FORMAT.Time)}
            </time>
            &mdash;
            <time class="event__end-time" datetime="${formatDate(event.start, DATE_FORMAT.FullTime)}">
              ${formatDate(event.start, DATE_FORMAT.Time)}
            </time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOfferTemplate(event)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class EventsView {
  #event = null;
  #element = null;

  constructor({ event }) {
    this.#event = event;
  }

  get template() {
    return createEventsTemplate(this.#event);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}