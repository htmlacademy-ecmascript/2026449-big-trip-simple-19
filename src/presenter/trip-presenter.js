import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import { FilterType } from '../const.js';
import EventPresenter from './event-presenter';

export default class TripPresenter {
  #events = [];
  #eventListView = new EventListView();
  #noEventsView = new NoEventsView();
  #filterContainer = null;
  #siteMainContainer = null;
  #eventModel = null;
  #eventPresenters = [];

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
    } else {
      this.#renderSortView();
      this.#renderEventsListView();

      for (let i = 0; i < this.#events.length; i++) {
        const eventPresenter = new EventPresenter({
          eventListView: this.#eventListView,
          beforeEditCallback: this.#resetEvents
        });
        eventPresenter.init(this.#events[i]);
        this.#eventPresenters.push(eventPresenter);
      }
    }
  }

  #resetEvents = () => {
    this.#eventPresenters.forEach((eventPresenter) => eventPresenter.reset());
  };

  #renderFilter () {
    render(new FilterView({ filters: Object.keys(FilterType) }), this.#filterContainer);
  }

  #renderEmptyView () {
    render(this.#noEventsView, this.#siteMainContainer);
  }

  #renderSortView () {
    render(new SortView(), this.#siteMainContainer);
  }

  #renderEventsListView () {
    render(this.#eventListView, this.#siteMainContainer);
  }
}
