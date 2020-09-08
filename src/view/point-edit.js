import {PATH_TYPE, DESTINATION} from '../const.js';
import {humanizeDate} from '../utils/point.js';
import {getAction} from '../utils/common.js';
import Smart from './smart.js';
// import flatpickr from "flatpickr";

// import "../../node_modules/flatpickr/dist/flatpickr.min.css";
// import '../../node_modules/flatpickr/dist/themes/material-blue.css';

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
  return types.map((type) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${type.name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.name}">
        <label class="event__type-label  event__type-label--${type.name.toLowerCase()}" for="event-type-${type.name.toLowerCase()}-1">${type.name}</label>
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
  if (!destination) {
    return ``;
  }

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
  const {type, destination, information, pointPrice, offers, timeStart, timeEnd, isFavorite} = point;

  return (
    `<form class="event  event--edit" action="#" method="post">
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
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
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

export default class PointEdit extends Smart {
  constructor(point = POINT_BLANK) {
    super();
    this._point = point;
    this._datePickerStart = null;
    this._datePickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._inputPriceChangeHandler = this._inputPriceChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  _getTemplate() {
    return createEditFormTemplate(this._point);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormCloseHandler(this._callback.formClose);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationChangeHandler);
    this.getElement().querySelector(`.event__input--price`)
      .addEventListener(`input`, this._inputPriceChangeHandler);
    this.getElement().querySelector(`.event__type-list`)
      .addEventListener(`change`, this._typeChangeHandler);
  }

  // _setDatePickerStart() {
  //   if (this._datePickerStart) {
  //     this._datePickerStart.destroy();
  //     this._datePickerStart = null;
  //   }
  // }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  _formCloseHandler() {
    this._callback.formClose();
  }

  _favoriteClickHandler() {
    this._callback.favoritClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoritClick = callback;
    this.getElement()
      .querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

  setFormCloseHandler(callback) {
    this._callback.formClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._formCloseHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updeteData({
      type: {
        name: evt.target.value,
        action: getAction(this),
      },
    });
  }

  // _timeStartChangeHandler([userDate]) {

  // }

  _inputPriceChangeHandler(evt) {
    evt.preventDefault();
    this.updeteData({
      pointPrice: evt.target.value,
    }, true);
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updeteData({
      destination: evt.target.value,
    }, true);
  }
}
