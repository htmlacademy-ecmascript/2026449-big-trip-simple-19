import { createElement } from '../render.js';

function eventsListTemplate() {
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
}

export default class EventsListView {
  #element = null;

  get template() {
    return eventsListTemplate();
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
