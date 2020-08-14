import {createTripInfoTemplate} from './view/trip-info.js';
import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortingTemplate} from './view/sorting.js';
import {createEditFormTemplate} from './view/form-edit.js';
import {createDaysListTemplate} from './view/days-list.js';
import {createDaysItemTemplate} from './view/days-item.js';
import {createDayInfoTemplate} from './view/day-info.js';
import {createPointsTemplate} from './view/trip-points.js';
import {generatePoints} from './mock/points.js';

const POINT_COUNT = 3;

const points = new Array(POINT_COUNT).fill().map(generatePoints);

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
render(daysListElement, createDaysItemTemplate(), `beforeend`);

const daysItemElement = daysListElement.querySelector(`.trip-days__item `);
render(daysItemElement, createDayInfoTemplate(), `afterbegin`);

const dotsListElement = daysItemElement.querySelector(`.trip-events__list`);
for (let i = 0; i < POINT_COUNT; i++) {
  render(dotsListElement, createPointsTemplate(points[i]), `beforeend`);
}

