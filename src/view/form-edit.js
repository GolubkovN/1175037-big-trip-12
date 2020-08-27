import {PATH_TYPE, DESTINATION} from '../const.js';
import {humanizeDate} from '../utils/point.js';
import Abstract from './abstract.js';

const POINT_BLANK = {
  type: PATH_TYPE[0],
  destination: DESTINATION[0],
  offers: ``,
  information: {
    description: ``,
    url: ``,
  },
  timeStart: null,
  timeEnd: null,
  duration: null,
  pointPrice: 0,
};

const createTypesTemplate = (types) => {
  return types.map((type, index) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${type.name.toLowerCase()}-${index + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.name.toLowerCase()}">
        <label class="event__type-label  event__type-label--${type.name.toLowerCase()}" for="event-type-${type.name.toLowerCase()}-${index + 1}">${type.name}</label>
      </div>`
    );
  }).join(`\n`);
};

const createPointDestinationTemplate = (destinations) => {
  return destinations.map((destination) => `<option value="${destination}"></option>`).join(`\n`);
};

const createOfferItemTemplate = (offers) => {
  return offers.map(({title, price, isChecked}) => {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}"${isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${title}-1">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

const createDestinationInfoTemplate = (destination) => {
  return (
    `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">
        ${destination.description}
      </p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${destination.url.map((photo) =>
      (`<img class="event__photo" src="${photo}" alt="Event photo">`))
        .join(``)}
        </div>
      </div>
  `);
};

const createEditFormTemplate = (point = {}) => {
  const {type, destination, information, pointPrice, offers, timeStart, timeEnd} = point;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.name}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${createTypesTemplate(PATH_TYPE.slice(0, 6))}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${createTypesTemplate(PATH_TYPE.slice(6))}
              </fieldset>
            </div>
          </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type.name} ${type.action}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createPointDestinationTemplate(DESTINATION)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(timeStart)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(timeEnd)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${pointPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createOfferItemTemplate(offers)}
          </div>
        </section>
        ${createDestinationInfoTemplate(information)}
      </section>
    </form>`
  );
};

export default class PointEdit extends Abstract {
  constructor(point = POINT_BLANK) {
    super();
    this._point = point;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formResetHandler = this._formResetHandler.bind(this);
  }

  _getTemplate() {
    return createEditFormTemplate(this._point);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  _formResetHandler(evt) {
    evt.preventDefault();
    this._callback.resetForm();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setResetFormHandler(callback) {
    this._callback.resetForm = callback;
    this.getElement().addEventListener(`reset`, this._formResetHandler);
  }

}
