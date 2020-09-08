import {getRandomInteger} from '../utils/common.js';
import {CountOffers} from '../const.js';
import Abstract from './abstract.js';
import moment from 'moment';

const createOfferTemplate = (offers) => {
  return offers
    .filter((it) => it.isChecked === true)
    .slice(0, getRandomInteger(CountOffers.MIN, CountOffers.MAX))
    .map((it) =>
      `<li class="event__offer">
        <span class="event__offer-title">${it.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
       </li>`).join(``);
};

const normalDuration = (duration) => {
  const hourDuration = Math.floor(duration / 60);
  const minuteDuration = duration % 60;
  return hourDuration >= 1 ? `${hourDuration}H ${minuteDuration}M` : `${minuteDuration}M`;
};

const createPointsTemplate = (point) => {
  const {type, destination, timeEnd, timeStart, duration, pointPrice} = point;
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
            <time class="event__start-time" datetime="2019-03-18T10:30">${moment(timeStart).format(`HH:MM`)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${moment(timeEnd).format(`HH:MM`)}</time>
          </p>
          <p class="event__duration">${normalDuration(duration)}</p>
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

  _getTemplate() {
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
