import {render} from './render.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventModel from './model/events-model.js';

const siteFilterElement = document.querySelector('.trip-controls');
const siteMainElement = document.querySelector('.trip-events');
const siteTripMain = document.querySelector('.trip-main');

render(new NewEventButtonView(), siteTripMain);

const eventModel = new EventModel();

const tripPresenter = new TripPresenter({
  filterContainer: siteFilterElement,
  siteMainContainer: siteMainElement,
  eventModel
});

tripPresenter.init();

