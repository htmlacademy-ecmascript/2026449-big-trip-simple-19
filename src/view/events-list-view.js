import {createElement} from '../render.js';

function eventsListTemplate() {
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
}

export default class EventsListView {
  getTemplate() {
    return eventsListTemplate();
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
