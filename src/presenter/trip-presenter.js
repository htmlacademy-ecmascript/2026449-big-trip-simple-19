import { render } from '../render.js';
import FilterView from '../view/filter-view.js';
import EventView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import NoEventsView from '../view/no-events-view.js';

export default class TripPresenter {
  #events = [];
  #eventListView = new EventListView();
  #noEventsView = new NoEventsView();
  #filterContainer = null;
  #siteMainContainer = null;
  #eventModel = null;

  constructor({ filterContainer, siteMainContainer, eventModel }) {
    this.#filterContainer = filterContainer;
    this.#siteMainContainer = siteMainContainer;
    this.#eventModel = eventModel;
  }

  init() {
    this.#events = [...this.#eventModel.event];
    render(new FilterView(), this.#filterContainer);

    if (!this.#events.length) {
      render(this.#noEventsView, this.#siteMainContainer);
    } else {
      render(new SortView(), this.#siteMainContainer);
      render(this.#eventListView, this.#siteMainContainer);

      for (let i = 0; i < this.#events.length; i++) {
        this.#renderEvent(this.#events[i]);
      }
    }
  }

  #renderEvent(event) {
    const eventComponent = new EventView({ event });
    const eventEditComponent = new EventEditView({ event });

    const replaceCardToForm = () => {
      this.#eventListView.element.replaceChild(eventEditComponent.element, eventComponent.element);
    };

    const replaceFormToCard = () => {
      this.#eventListView.element.replaceChild(eventComponent.element, eventEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    eventEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(eventComponent, this.#eventListView.element);
  }
}
