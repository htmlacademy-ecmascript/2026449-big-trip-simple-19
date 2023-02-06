import { render, RenderPosition, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';
import EventPresenter from './event-presenter';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortDate, sortPrice } from '../utils/event.js';
import { filter } from '../utils/filter.js';
import NewEventPresenter from './new-event-presenter.js';

export default class TripPresenter {
  #tripContainer = null;
  #eventModel = null;
  #filterModel = null;

  #tripComponent = new EventListView();
  #noEventComponent = null;
  #newEventPresenter = null;
  #sortComponent = null;
  #currentSortType = SortType.DATE;
  #filterType = FilterType.ALL;
  #onNewEventDestroy = null;

  #eventPresenter = new Map();

  constructor({ tripContainer, eventModel, filterModel, onNewEventDestroy }) {
    this.#tripContainer = tripContainer;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;
    this.#onNewEventDestroy = onNewEventDestroy;

    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#tripComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewEventDestroy,
    });

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventModel.events;
    const filteredTasks = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredTasks.sort(sortDate);//
      case SortType.PRICE:
        return filteredTasks.sort(sortPrice);//
    }

    return filteredTasks;
  }

  init() {
    this.#renderBoard();
  }

  createEvent() {
    this.#currentSortType = SortType.DATE;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#newEventPresenter.init();
  }


  #renderNoEvent() {
    this.#noEventComponent = new NoEventsView({
      filterType: this.#filterType
    });

    render(this.#noEventComponent,
      this.#tripComponent.element,
      RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      tripEventContainer: this.#tripComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction
    });

    eventPresenter.init(event);
    this.#eventPresenter.set(event.uniqueId, eventPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearBoard({ resetSortType = false } = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DATE;
    }
  }

  #renderBoard() {
    const events = this.events;
    if (events.length === 0) {
      this.#renderNoEvent();
    } else {
      this.#renderSort();
      render(this.#tripComponent, this.#tripContainer);
      events.forEach((event) => {
        this.#renderEvent(event);
      });
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetRenderedTaskCount: true, resetSortType: true });
        this.#renderBoard();
        break;
    }
  };
}
