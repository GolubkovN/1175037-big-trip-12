import {formatTime} from '../utils.js';

export const createPointsTemplate = (point) => {
  const {type, destination, timeEnd, timeStart, totalPrice, offers} = point;
  const start = timeStart.toLocaleString().slice(12, 17);
  const end = timeEnd.toLocaleString().slice(12, 17);
  const price = totalPrice + offers.price;

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
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${offers.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offers.price}</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
