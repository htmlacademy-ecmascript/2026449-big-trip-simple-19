import { render } from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventModel from './model/events-model.js';
import FilterView from './view/filter-view.js';
import { generateFilter } from './mock/filter.js';

const eventModel = new EventModel();

const filters = generateFilter(eventModel.events);

const filterContainerElement = document.querySelector('.trip-controls');
const mainContentElement = document.querySelector('.trip-events');
const siteTripMain = document.querySelector('.trip-main');

render(new FilterView({ filters }), filterContainerElement);
render(new NewEventButtonView(), siteTripMain);

const tripPresenter = new TripPresenter({
  siteMainContainer: mainContentElement,
  eventModel
});

tripPresenter.init();

