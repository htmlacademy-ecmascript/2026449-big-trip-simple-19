import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import { FILTER_TYPE, SORT_TYPE } from '../const.js';
import EventPresenter from './event-presenter';
import { sortDate, sortPrice } from '../utils/event.js';

export default class TripPresenter {
  #events = [];
  #eventListView = new EventListView();
  #noEventsView = new NoEventsView();
  #filterContainer = null;
  #siteMainContainer = null;
  #eventModel = null;
  #eventPresenters = [];
  #sortComponent = null;
  #currentSortType = SORT_TYPE.DAY;

  constructor({ filterContainer, siteMainContainer, eventModel }) {
    this.#filterContainer = filterContainer;
    this.#siteMainContainer = siteMainContainer;
    this.#eventModel = eventModel;
  }

  init() {
    this.#events = [...this.#eventModel.event];
    this.#renderFilter();

    if (!this.#events.length) {
      this.#renderEmptyView();
      return;
    }

    this.#sortEvents(this.#currentSortType);
    this.#renderSortView();
    this.#renderEventListView();
  }

  #clearEventListView = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.destroy());
    this.#eventPresenters = [];
  };

  #sortEvents (sortType) {
    switch (sortType) {
      case SORT_TYPE.DAY:
        this.#events.sort(sortDate);
        break;
      case SORT_TYPE.PRICE:
        this.#events.sort(sortPrice);
        break;
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortEvents(sortType);
    this.#clearEventListView();
    this.#renderEventListView();
  };

  #resetEvents = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.reset());
  };

  #renderFilter () {
    render(new FilterView({ filters: Object.keys(FILTER_TYPE) }), this.#filterContainer);
  }

  #renderEmptyView () {
    render(this.#noEventsView, this.#siteMainContainer);
  }

  #renderSortView () {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#siteMainContainer);
  }

  #renderEventListView () {
    for (let i = 0; i < this.#events.length; i++) {
      const eventPresenter = new EventPresenter({
        eventListView: this.#eventListView,
        beforeEditCallback: this.#resetEvents
      });
      eventPresenter.init(this.#events[i]);
      this.#eventPresenters.push(eventPresenter);
    }

    render(this.#eventListView, this.#siteMainContainer);
  }
}
