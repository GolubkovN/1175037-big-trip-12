import Abstract from './abstract.js';

export default class NoPoints extends Abstract {
  _getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}
