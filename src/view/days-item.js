import {createElement} from '../utils.js';

const createDaysItemTemplate = (date, number) => {
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${number}</span>
          <time class="day__date" datetime="${date.toDateString()}">${date.toDateString().substring(4, 10)}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
  );
};

export default class Day {
  constructor(date, number) {
    this._date = date;
    this._number = number;
    this._element = null;
  }

  _getTemplate() {
    return createDaysItemTemplate(this._date, this._number);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
