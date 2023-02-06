import { render, replace, remove } from '../framework/render.js';
import EventView from '../view/events-view.js';
import EventEditView from '../view/event-edit-view.js';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #tripEventContainer = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #offers = null;
  #destination = null;

  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  #handleDataChange = null;

  constructor({ tripEventContainer, onModeChange, onDataChange }) {
    this.#tripEventContainer = tripEventContainer;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(event) {
    const { offers, destination } = event;
    this.#event = event;
    this.#offers = offers;
    this.#destination = destination;
    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      offers: this.#offers,
      destination: this.#destination,
      onEditClick: this.#handleEditClick
    });

    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      offers: this.#offers,
      destination: this.#destination,
      onFormSubmit: this.#formSubmitHandler,
      onFormClose: this.#closeEventEditFormHandler,
      onDeleteClick: this.#deleteClickHandler,
    });


    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#tripEventContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      {
        replace(this.#eventComponent, prevEventComponent);
      }
    }

    if (this.#mode === Mode.EDITING) {
      {
        replace(this.#eventEditComponent, prevEventEditComponent);
      }
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToPoit();
    }
  }

  #replaceEventToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoit() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToPoit();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #formSubmitHandler = (event, offers, destination) => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      event,
      offers,
      destination);
    this.#replaceFormToPoit();
  };

  #closeEventEditFormHandler = () => {
    this.#replaceFormToPoit();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #deleteClickHandler = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };
}
