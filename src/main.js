import TripInfoView from './view/trip-info.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import {generatePoint} from './mock/points.js';
import {render, RenderPosition} from './utils/render.js';

const POINT_COUNT = 10;

const points = new Array(POINT_COUNT).fill(``).map(generatePoint).sort((a, b) => a.timeStart - b.timeStart);
const filters = [
  {
    type: `everything`,
    name: `EVERYTHING`,
    count: 0,
  }
];

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
const filterModel = new FilterModel();
const pointModel = new PointsModel();
pointModel.setPoints(points);
new TripPresenter(tripEventsElement, pointModel).init();

