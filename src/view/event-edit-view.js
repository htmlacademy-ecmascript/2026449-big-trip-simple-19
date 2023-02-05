import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EVENTS_TYPE, DATE_FORMAT } from '../const.js';
import { formatDate } from '../utils/day.js';

function createDestinationNameOptionsTemplate(destinations, event) {
  const uniqueDestinations = Array.from(new Set(destinations));

  return uniqueDestinations.map((destination) => (
    `<option 
      value=${destination.name} ${destination.id === event.eventDestination.id ? 'selected' : ''}
    >
      ${destination.type.toUpperCase() + event.eventDestination.title}
    </option>`)).join('');
}

function createDestinationImagesTemplate(destination) {
  return destination.pictures.map((picture) => `
    <img class="event__photo" src="${picture}" alt="Event photo">
  `);
}

function createEventItemTemplate() {
  return Object.values(EVENTS_TYPE).map((event, index) =>
    `<div class="event__type-item">
      <input 
        id="event-type-${event.toLowerCase()}-${index}" 
        class="event__type-input  visually-hidden" 
        type="radio" name="event-type" 
        value="${event}"
      >
      <label 
        class="event__type-label  event__type-label--${event.toLowerCase()}" 
        for="event-type-${event.toLowerCase()}-${index}"
      >
        ${event}
      </label>
    </div>`
  ).join('');
}

function createOfferTemplate(offers, availableOffers) {
  if (offers || !Object.keys(offers).length) {
    return 'No available offers';
  }

  return availableOffers.map((offer, index) => (
    `<div class="event__offer-selector">
        <input 
          class="event__offer-checkbox  visually-hidden" 
          id="event-offer-comfort-${index}" 
          type="checkbox" 
          name="event-offer-comfort" 
          ${Math.random() < 0.5 ? 'checked' : ''}
        >
        <label class="event__offer-label" for="event-offer-comfort-${index}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
  `)).join('');
}

function createEventEditTemplate(event, destination, availableOffers, isNewPoint, allDestinations) {
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                ${createEventItemTemplate()}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${event.type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
            <datalist id="destination-list-1">
              ${createDestinationNameOptionsTemplate(allDestinations, event)}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(event.start, DATE_FORMAT.FormTime)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(event.end, DATE_FORMAT.FormTime)}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input 
              class="event__input  event__input--price" 
              id="event-price-1" 
              type="number" 
              name="event-price" 
              value="${event.price}"
            >
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isNewPoint ? 'Cancel' : 'Delete'}</button>
            ${isNewPoint ? '' : `<button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>`}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${createOfferTemplate(event.offers, availableOffers)}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                  ${createDestinationImagesTemplate(destination)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class EditEventFormView extends AbstractStatefulView {
  #allOffers = null;
  #destinations = null;
  #isNewPoint = Boolean;
  #handleFormSubmit = () => { };
  #handleRollupButtonClick = () => { };
  #sourceOffers = null;
  #sourceType = null;

  constructor({ event, destinations, allOffers, isNewPoint, onFormSubmit, onRollupButtonClick }) {
    super();
    this.#destinations = destinations;
    this.#allOffers = allOffers;
    this.#isNewPoint = isNewPoint;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollupButtonClick;
    this._setState(EditEventFormView.parseEventToState(event, this.#allOffers, this.#destinations));

    this.#sourceOffers = this._state.offers;
    this.#sourceType = event.type;

    this._restoreHandlers();
  }

  static parseEventToState(event, allOffers, destinations) {
    const availableOffers = allOffers.find((item) => item.type === event.type).offers;
    const eventDestination = destinations.find((item) => event.destination === item.id);
    return {
      ...event,
      availableOffers,
      eventDestination
    };
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#rollupButtonClickHandler);
    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('#destination-list-1')
      .addEventListener('change', this.#eventDestinationChangeHandler);
  }

  get template() {
    return createEventEditTemplate(this._state, this._state.eventDestination, this._state.availableOffers, this.#isNewPoint, this.#allOffers, this.#destinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const type = evt.target.value;
    const availableOffers = this.#allOffers.find((item) => item.type === type).offers;
    const offers = type === this.#sourceType ? this.#sourceOffers : [];

    if (evt.target.className.includes('event__type-input')) {
      this.updateElement({ type, availableOffers, offers });
    }
  };

  #eventDestinationChangeHandler = (evt) => {
    const { value } = evt.target;
    const newDestination = this.#destinations.find((destination) => destination.name === value);
    this.updateElement({ eventDestination: newDestination });
  };
}
