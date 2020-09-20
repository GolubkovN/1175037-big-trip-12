import Abstract from './abstract.js';

export default class EmptyDay extends Abstract {
  getTemplate() {
    return `<li class="trip-days__item  day">
              <div class="day__info"></div>
              <ul class="trip-events__list"></ul>
            </li>`;
  }
}
