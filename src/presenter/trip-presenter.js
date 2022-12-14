import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import EventView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class TripPresenter {
  EventListView = new EventListView();
  EVENTS_COUNT = 3;

  constructor({filterContainer, siteMainContainer}) {
    this.filterContainer = filterContainer;
    this.siteMainContainer = siteMainContainer;
  }

  init() {
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.siteMainContainer);
    render(this.EventListView, this.siteMainContainer);
    render(new EventEditView(), this.EventListView.getElement());

    for (let i = 0; i < this.EVENTS_COUNT; i++) {
      render(new EventView(), this.EventListView.getElement());
    }
  }
}
