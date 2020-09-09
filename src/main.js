import TripInfoView from './view/trip-info.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import NoPointsView from './view/no-points.js';
import TripPresenter from './presenter/trip.js';
import {generatePoint} from './mock/points.js';
import {render, RenderPosition} from './utils/render.js';

const POINT_COUNT = 15;

const points = new Array(POINT_COUNT).fill(``).map(generatePoint).sort((a, b) => a.timeStart > b.timeStart ? 1 : -1);

// header
const siteHeaderElement = document.querySelector(`.page-header`);
const menuElement = siteHeaderElement.querySelector(`.trip-main`);
const tripInfoComponent = new TripInfoView(points);
render(menuElement, tripInfoComponent, RenderPosition.AFTERBEGIN);

const controlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
render(controlsElement, new MenuView(), RenderPosition.AFTERBEGIN);
render(controlsElement, new FilterView(), RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector(`.page-body__page-main.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

if (points.length === 0) {
  render(tripEventsElement, new NoPointsView(), RenderPosition.BEFOREEND);
} else {
  new TripPresenter(tripEventsElement).init(points);
}
