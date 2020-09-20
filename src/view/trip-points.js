import {normalDuration} from '../utils/point.js';
import {CountOffers} from '../const.js';
import Abstract from './abstract.js';
import moment from 'moment';

const createOfferTemplate = (offers) => {
  return offers
    .filter(({isChecked}) => isChecked)
   .slice(CountOffers.MIN, CountOffers.MAX)
    .map(({price, title}) =>
      `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
       </li>`).join(``);
};

const createPointsTemplate = (point) => {
  const {type, destination, timeEnd, timeStart, pointPrice} = point;
  const offers = createOfferTemplate(point.offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.name.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type.name} ${type.action} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${moment(timeStart).format(`HH:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${moment(timeEnd).format(`HH:mm`)}</time>
          </p>
          <p class="event__duration">${normalDuration(timeStart, timeEnd)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${pointPrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Point extends Abstract {
  constructor(point) {
    super();
    this._point = point;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createPointsTemplate(this._point);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }
}
