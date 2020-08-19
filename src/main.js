import {createTripInfoTemplate} from './view/trip-info.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortingTemplate} from './view/sorting.js';
import {createEditFormTemplate} from './view/form-edit.js';
import {createDaysListTemplate} from './view/days-list.js';
import {createDaysItemTemplate} from './view/days-item.js';
import {createPointsTemplate} from './view/trip-points.js';
import {generatePoint} from './mock/points.js';
import {createElement, renderElement} from './utils.js';

const POINT_COUNT = 12;

const points = new Array(POINT_COUNT).fill(``).map(generatePoint);

const dates = [
  ...new Set(points.map((point) => new Date(point.timeStart).toDateString()))
];

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// header
const menuElement = document.querySelector(`.trip-main`);
render(menuElement, createTripInfoTemplate(), `afterBegin`);

const controlsElement = document.querySelector(`.trip-main__trip-controls`);
render(controlsElement, createMenuTemplate(), `afterbegin`);
render(controlsElement, createFilterTemplate(), `beforeend`);

// sorting
const tripEventsElement = document.querySelector(`.trip-events`);
render(tripEventsElement, createSortingTemplate(), `afterbegin`);

// form edit
render(tripEventsElement, createEditFormTemplate(points[0]), `beforeend`);

// days list
render(tripEventsElement, createDaysListTemplate(), `beforeend`);

const daysListElement = tripEventsElement.querySelector(`.trip-days`);

dates.forEach((date, index) => {
  const dayElement = createElement(createDaysItemTemplate(new Date(date), index + 1));

  points.filter((point) => new Date(point.timeStart).toDateString() === date).forEach((point) => {
    renderElement(dayElement.querySelector(`.trip-events__list`), createElement(createPointsTemplate(point)), `beforeend`);
  });

  renderElement(daysListElement, dayElement, `beforeend`);
});
