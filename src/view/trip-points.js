import {getRandomInteger, formatTime} from '../utils.js';
import {OFFERS} from '../const.js';

const CountOffers = {
  MIN: 0,
  MAX: 5,
};

const generateOffers = () => {
  const offers = OFFERS
    .slice(0, getRandomInteger(CountOffers.MIN, CountOffers.MAX));

  return offers;
};

const createOfferTemplate = (event) => {
  event = generateOffers();
  return event
    .filter((it) => it.isChecked === true)
    .slice(0, 5)
    .map((it) =>
      `<li class="event__offer">
        <span class="event__offer-title">${it.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
       </li>`).join(``);
};

export const createPointsTemplate = (point) => {
  const {type, destination, timeEnd, timeStart, PointPrice} = point;

  const start = timeStart.toLocaleString().slice(12, 17);
  const end = timeEnd.toLocaleString().slice(12, 17);
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
            <time class="event__start-time" datetime="2019-03-18T10:30">${start}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${end}</time>
          </p>
          <p class="event__duration">${formatTime(timeEnd - timeStart)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${PointPrice}</span>
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
