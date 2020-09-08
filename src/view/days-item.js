import Abstract from './abstract.js';

const createDaysItemTemplate = (date, number) => {
  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${number}</span>
          <time class="day__date" datetime="${date}">${date.toDateString().substring(4, 10)}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>`
  );
};

export default class Day extends Abstract {
  constructor(date, number) {
    super();
    this._date = date;
    this._number = number;
  }

  _getTemplate() {
    return createDaysItemTemplate(this._date, this._number);
  }
}
