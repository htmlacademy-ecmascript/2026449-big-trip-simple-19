import { render, replace } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import EventView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import NoEventsView from '../view/no-events-view.js';
import { FilterType } from '../const.js';

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
    render(new FilterView({ filters: Object.keys(FilterType) }), this.#filterContainer);

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      event,
      onEditClick: () => {
        replaceCardToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new EventEditView({
      event,
      onFormSubmit: () => {
        replaceCardToForm.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormClick: () => {
        replaceFormToCard.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToCard() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#eventListView.element);
  }
}
