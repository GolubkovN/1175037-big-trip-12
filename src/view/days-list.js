import Abstract from './abstract.js';

export default class DaysList extends Abstract {
  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }

  clear() {
    this.getElement().innerHTML = ``;
  }
}
