import Abstract from './abstract.js';

export default class NewEvenetButton extends Abstract {
  constructor() {
    super();

    this._addClickHandler = this._addClickHandler.bind(this);
  }

  disable() {
    this.getElement().disabled = true;
  }

  enable() {
    this.getElement().disabled = false;
  }

  setAddClickHandler(callback) {
    this._callback.addClick = callback;
    this.getElement().addEventListener(`click`, this._addClickHandler);
  }

  getTemplate() {
    return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
  }

  _addClickHandler(evt) {
    evt.preventDefault();
    this._callback.addClick();
  }
}
