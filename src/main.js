import { render } from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const eventModel = new EventModel();
const filterModel = new FilterModel();

const headerFiltersElement = document.querySelector('.trip-controls__filters');
const mainContentElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls');

const tripPresenter = new TripPresenter({
  tripContainer: mainContentElement,
  eventModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: headerFiltersElement,
  filterModel,
  eventModel
});

const newTaskButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newTaskButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  tripPresenter.createEvent();
  newTaskButtonComponent.element.disabled = true;
}

render(newTaskButtonComponent, filterContainerElement);

filterPresenter.init();
tripPresenter.init();
