import Abstract from './abstract.js';
import moment from 'moment';

const POINT_COUNT_FOR_ROUT = 3;

export default class TripInfo extends Abstract {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return `<section class="trip-main__trip-info  trip-info">
              <div class="trip-info__main">
                <h1 class="trip-info__title">${this._getCities(this._events)}</h1>
                <p class="trip-info__dates">${this._getEventsPeriod(this._events)}</p>
              </div>
              <p class="trip-info__cost">
                Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._getSumPointsPrice(this._events)}</span>
              </p>
            </section>`;
  }

  _getCities(events) {
    const cities = events.map(({destination}) => destination);

    return cities.length > POINT_COUNT_FOR_ROUT
      ? `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`
      : cities.join(` &mdash; `);
  }

  _getEventsPeriod(events) {
    if (events.length) {
      const startDate = events[0].timeStart;
      const endDate = events[events.length - 1].timeEnd;
      const monthStart = moment(startDate).format(`MMM`);
      const monthEnd = moment(endDate).format(`MMM`);

      const monthEndValue = monthStart === monthEnd ? `` : monthEnd;

      return `${monthStart} ${startDate.getDate()}${`&nbsp;&mdash;&nbsp;`}${monthEndValue} ${endDate.getDate()}`;
    }

    return ``;
  }

  _getSumPointsPrice(events) {
    return events.reduce((accumulator, {offers, pointPrice}) => {
      const offersTotalPrice = offers.reduce((accumulatorInner, {price, isChecked}) => {
        return isChecked ? price + accumulatorInner : accumulatorInner;
      }, 0);

      return offersTotalPrice + accumulator + pointPrice;
    }, 0);
  }
}

