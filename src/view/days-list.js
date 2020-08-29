import Abstract from './abstract.js';

const createDaysListTemplate = () => {
  return (
    `<ul class="trip-days">

    </ul>`
  );
};

export default class DaysList extends Abstract {
  _getTemplate() {
    return createDaysListTemplate();
  }
}
