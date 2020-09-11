import Abstract from './abstract.js';
import moment from 'moment';

const POINT_COUNT_FOR_ROUT = 3;

const getCities = (events) => {
  const cities = events.map(({destination}) => destination);

  return cities.length > POINT_COUNT_FOR_ROUT
    ? `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`
    : cities.join(` &mdash; `);
};

const getSumPointsPrice = (events) => {
  const checkedOffers = [];
  events
    .map(({offers}) => offers
    .map((offer) => offer.isChecked
      ? checkedOffers.push(offer)
      : ``));

  const offersSum = checkedOffers.reduce((total, offer) => total + offer.price, 0);
  const pointsSum = events.reduce((total, point) => total + point.pointPrice, 0);

  return offersSum + pointsSum;
};

const getEventsPeriod = (events) => {
  if (events.length) {
    const startDate = events[0].timeStart;
    const endDate = events[events.length - 1].timeEnd;
    const monthStart = moment(startDate).format(`MMM`);
    const monthEnd = moment(endDate).format(`MMM`);

    const dayStart = startDate.getDate() + `&nbsp;&mdash;&nbsp;`;
    const dayEnd = endDate.getDate();

    const separator = monthStart === monthEnd ? `` : monthEnd + ` `;
    return `${monthStart} ${dayStart}${separator}${dayEnd}`;
  }
  return ``;
};

const createTripInfoTemplate = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${getCities(events)}</h1>
          <p class="trip-info__dates">${getEventsPeriod(events)}</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${getSumPointsPrice(events)}</span>
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

