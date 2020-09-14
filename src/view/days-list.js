import Abstract from './abstract.js';

export default class DaysList extends Abstract {
  _getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }

  clear() {
    this.getElement().innerHTML = ``;
  }
}
