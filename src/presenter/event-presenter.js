import { render, replace } from '../framework/render.js';
import EventView from '../view/events-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class EventPresenter {
  #event;
  #eventListView;
  #replaceFormToCard;
  #replaceCardToForm;
  #escKeyDownHandler;
  #eventComponent;
  #eventEditComponent;
  #beforeEditCallback;
  #isFormOpened;

  constructor ({eventListView, beforeEditCallback}) {
    this.#eventListView = eventListView;
    this.#beforeEditCallback = beforeEditCallback;
  }

  init (event) {
    this.#event = event;
    this.#isFormOpened = false;

    this.#eventComponent = new EventView({
      event: this.#event,
      onEditClick: this.#handleEditClick
    });

    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose
    });

    this.#replaceCardToForm = () => {
      replace(this.#eventEditComponent, this.#eventComponent);
    };

    this.#replaceFormToCard = () => {
      replace(this.#eventComponent, this.#eventEditComponent);
    };

    this.#escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#replaceFormToCard();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    };

    render(this.#eventComponent, this.#eventListView.element);
  }

  #handleFormSubmit = () => {
    this.#isFormOpened = false;
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleEditClick = () => {
    this.#beforeEditCallback();
    this.#replaceCardToForm();
    this.#isFormOpened = true;
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormClose = () => {
    if (this.#isFormOpened) {
      this.#replaceFormToCard();
      this.#isFormOpened = false;
    }
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  reset = () => {
    this.#handleFormClose();
  };
}
