import Abstract from './abstract.js';
import moment from 'moment';

const createTripInfoTemplate = (events) => {
  let monthStart = ``;
  let monthEnd = ``;
  let dayStart = ``;
  let dayEnd = ``;
  let checkMonth = () => ``;

  if (events.length) {
    const startDate = new Date(events[0].timeStart);
    const endDate = new Date(events[events.length - 1].timeEnd);
    monthStart = moment(startDate).format(`MMM`);
    monthEnd = moment(endDate).format(`MMM`);

    dayStart = startDate.getDate() + `&nbsp;&mdash;&nbsp;`;
    dayEnd = endDate.getDate();
  }

  checkMonth = () => {
    if (monthStart === monthEnd) {
      return ``;
    }

    return monthEnd + ` `;
  };

  const getCities = () => {
    let cities = [];

    events.forEach((item) => {
      cities.push(item.destination);
    });

    if (cities.length > 3) {
      return (
        `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`
      );
    }

    return cities.join(` &mdash; `);
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${getCities()}</h1>
          <p class="trip-info__dates">${monthStart} ${dayStart}${checkMonth()}${dayEnd}</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
        </p>
      </section>`
  );
};

export default class TripInfo extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  _getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}

