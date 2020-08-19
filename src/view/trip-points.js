import {getRandomInteger} from '../utils.js';
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
  const {type, destination, timeEnd, timeStart, duration, pointPrice} = point;
  const offers = createOfferTemplate(point.offers);

  const normalDuration = () => {
    const hourDuration = Math.floor(duration / 60);
    const minuteDuration = duration % 60;
    if (hourDuration >= 1) {
      return `${hourDuration}H ${minuteDuration}M`;
    } else {
      return `${minuteDuration}M`;
    }
  };

  const pointZero = (time) => {
    let pointZeroCheck = ``;
    if (time.getMinutes() < 10) {
      pointZeroCheck = `0`;
    } else {
      pointZeroCheck = ``;
    }
    return pointZeroCheck;
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.name.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type.name} ${type.action} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart.getHours()}:${pointZero(timeStart)}${timeStart.getMinutes()}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd.getHours()}:${pointZero(timeEnd)}${timeEnd.getMinutes()}</time>
          </p>
          <p class="event__duration">${normalDuration()}</p>
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
