import AbstractView from '../framework/view/abstract-view.js';
import { formatDate } from '../utils/day.js';
import { DATE_FORMAT } from '../const.js';
import { mockDestinations } from '../mock/destinations.js';

function createTripEventListTemplate(tripEvent) {
  const { offers, type, dateFrom, dateTo, destination, basePrice } = tripEvent;

  const eventDestination = mockDestinations.find((item) => destination === item.id);
  const checkedOffers = offers.map((element) => element.id);

  const offersTemplate = () => {
    if (!checkedOffers.length) {
      return `<li class="event__offer">
      <span class="event__offer-title">No additional offers</span>
    </li>`;
    } else {
      const template = offers.map((offer) => `
      <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('');

      return template;
    }
  };

  return (
    `<ul class="trip-events__list">
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${formatDate(dateFrom, DATE_FORMAT.FullTime)}">
            ${formatDate(dateFrom, DATE_FORMAT.Day)}
          </time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${eventDestination ? eventDestination.name : ''}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${formatDate(dateFrom, DATE_FORMAT.FullTime)}">
                ${formatDate(dateFrom, DATE_FORMAT.Time)}
              </time>
              &mdash;
              <time class="event__end-time" datetime="${formatDate(dateTo, DATE_FORMAT.FullTime)}">
                ${formatDate(dateTo, DATE_FORMAT.Time)}
              </time>
            </p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersTemplate()}
          </ul>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    </ul>`
  );
}

export default class EventsView extends AbstractView {
  #tripEvent = null;
  #handleEditClick = null;
  #offers = null;
  #destination = null;

  constructor(tripEvent) {
    super();
    const { event, onEditClick, offers, destination } = tripEvent;
    this.#tripEvent = event;
    this.#offers = offers;
    this.#destination = mockDestinations.find((item) => destination === item.id);
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createTripEventListTemplate(this.#tripEvent);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick(this.#tripEvent, this.#offers, this.#destination);
  };
}
