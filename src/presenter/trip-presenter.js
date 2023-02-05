import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import EventPresenter from './event-presenter';
import { sortDate, sortPrice, updateItem } from '../utils/event.js';
import { SORT_TYPE } from '../const.js';

export default class TripPresenter {
  #siteMainContainer = null;
  #eventModel = null;

  #tripsListComponent = new EventListView();
  #sortComponent = null;
  #noEventsComponent = new NoEventsView();

  #events = [];
  #eventPresenter = new Map();

  constructor({ siteMainContainer, eventModel }) {
    this.#siteMainContainer = siteMainContainer;
    this.#eventModel = eventModel;
  }

  init() {
    this.#events = [...this.#eventModel.events.sort(sortDate)];
    this.#renderEventsList();
  }

  #renderEvent(event, destinations, offersByType) {
    const eventPresenter = new EventPresenter({
      container: this.#tripsListComponent,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleEventChange
    });
    eventPresenter.init(event, destinations, offersByType);
    this.#eventPresenter.set(event.id, eventPresenter);
  }

  #handleEventChange = (update) => {
    this.#events = updateItem(this.#events, update);
    this.#eventPresenter.get(update.id).init(update, this.#eventModel.destinations, this.#eventModel.offersByType);
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (event) => {
    this.#sortEvents(event.target.value);
    this.#rerenderEventsList();
  };

  #sortEvents = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.DAY:
        this.#events.sort(sortDate);
        break;
      case SORT_TYPE.PRICE:
        this.#events.sort(sortPrice);
        break;
    }
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      handleSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#siteMainContainer);
  }

  #renderNoEvents() {
    render(this.#noEventsComponent, this.#siteMainContainer);
  }

  #renderEventsList() {
    if (this.#events.length) {
      if (!this.#sortComponent) {
        this.#renderSort();
      }
      render(this.#tripsListComponent, this.#siteMainContainer);
      for (let i = 0; i < this.#events.length; i++) {
        this.#renderEvent(this.#events[i], this.#eventModel.destinations, this.#eventModel.offersByType);
      }
    } else {
      this.#renderNoEvents();
    }
  }

  #clearEventsList() {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  }

  #rerenderEventsList() {
    this.#clearEventsList();
    this.#renderEventsList();
  }
}
