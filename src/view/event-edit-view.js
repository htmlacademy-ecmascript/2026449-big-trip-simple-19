import { createElement } from '../render.js';
import { EVENTS_TYPE, DATE_FORMAT } from '../const.js';
import { formatDate } from '../utils';
import { mockEvents } from '../mock/event.js';
import { mockOffers } from '../mock/offers.js';
import { mockDestinations } from '../mock/destinations.js';

function createDestinationImagesTemplate () {
  return mockDestinations[0].pictures.map((picture) => `<img class="event__photo" src="${picture}" alt="Event photo">`);
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

function createOfferTemplate(event) {
  if (!event.offers || !Object.keys(event.offers).length) {
    return 'No available offers';
  }

  return mockOffers.map((offer, index) => (
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

function createEventEditTemplate(event) {
  return (
    `<form class="event event--edit" action="#" method="post">
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
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
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
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${createOfferTemplate(event)}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${mockDestinations[0].description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
                ${createDestinationImagesTemplate()}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
}

export default class EventEditView {
  constructor({ event = mockEvents }) {
    this.event = event;
  }

  getTemplate() {
    return createEventEditTemplate(this.event);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
