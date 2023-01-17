import { render } from '../render.js';
import FilterView from '../view/filter-view.js';
import EventView from '../view/events-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/events-list-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class TripPresenter {
  EventListView = new EventListView();
  EVENTS_COUNT = 3;

  constructor({ filterContainer, siteMainContainer, eventModel }) {
    this.filterContainer = filterContainer;
    this.siteMainContainer = siteMainContainer;
    this.eventModel = eventModel;
  }

  init() {
    this.event = [...this.eventModel.getEvent()];
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.siteMainContainer);
    render(this.EventListView, this.siteMainContainer);
    render(new EventEditView({ event: this.event[0] }), this.EventListView.getElement());

    for (let i = 1; i < this.event.length; i++) {
      render(new EventView({ event: this.event[i] }), this.EventListView.getElement());
    }
  }
}
