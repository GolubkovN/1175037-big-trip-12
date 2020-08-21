import TripInfoView from './view/trip-info.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import SortingView from './view/sorting.js';
// import {createEditFormTemplate} from './view/form-edit.js';
import DaysListView from './view/days-list.js';
import DayView from './view/days-item.js';
import PointView from './view/trip-points.js';
import {generatePoint} from './mock/points.js';
import {renderElement, RenderPosition} from './utils.js';


const POINT_COUNT = 12;

const points = new Array(POINT_COUNT).fill(``).map(generatePoint);

const dates = [
  ...new Set(points.map((point) => new Date(point.timeStart).toDateString()))
];

// header
const siteHeaderElement = document.querySelector(`.page-header`);
const menuElement = siteHeaderElement.querySelector(`.trip-main`);
renderElement(menuElement, new TripInfoView().getElement(), RenderPosition.AFTERBEGIN);

const controlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
renderElement(controlsElement, new MenuView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(controlsElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

// sorting
const pageMainElement = document.querySelector(`.page-body__page-main.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
renderElement(tripEventsElement, new SortingView().getElement(), RenderPosition.AFTERBEGIN);

// form edit
// render(tripEventsElement, createEditFormTemplate(points[0]), `beforeend`);

// days list
const daysListComponent = new DaysListView();
renderElement(tripEventsElement, daysListComponent.getElement(), RenderPosition.BEFOREEND);

dates.forEach((date, index) => {
  const dayComponent = new DayView(new Date(date), index + 1);

  points.filter((point) => new Date(point.timeStart).toDateString() === date).forEach((point) => {
    renderElement(
        dayComponent.getElement()
        .querySelector(`.trip-events__list`),
        new PointView(point).getElement(),
        RenderPosition.BEFOREEND
    );
  });

  renderElement(daysListComponent.getElement(), dayComponent.getElement(), RenderPosition.BEFOREEND);
});
