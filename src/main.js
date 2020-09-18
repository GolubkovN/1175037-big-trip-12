import TripInfoView from './view/trip-info.js';
import MenuView from './view/menu.js';
import NewEvenetButtonView from './view/new-event-button.js';
import FilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import {generatePoint} from './mock/points.js';
import {render, RenderPosition} from './utils/render.js';

const POINT_COUNT = 10;

const points = new Array(POINT_COUNT).fill(``).map(generatePoint).sort((a, b) => a.timeStart - b.timeStart);

// header
const siteHeaderElement = document.querySelector(`.page-header`);
const menuElement = siteHeaderElement.querySelector(`.trip-main`);
const tripInfoComponent = new TripInfoView(points);
render(menuElement, tripInfoComponent, RenderPosition.AFTERBEGIN);

const controlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
render(controlsElement, new MenuView(), RenderPosition.AFTERBEGIN);

const tripMainElement = document.querySelector(`.trip-main`);
const addPointButtonComponent = new NewEvenetButtonView();
render(tripMainElement, addPointButtonComponent, RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector(`.page-body__page-main.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const filterModel = new FilterModel();
const pointModel = new PointsModel();
const tripPresenter = new TripPresenter(tripEventsElement, pointModel, filterModel, addPointButtonComponent);
pointModel.setPoints(points);
tripPresenter.init();
new FilterPresenter(controlsElement, filterModel, pointModel).init();

const handleAddClick = () => {
  tripPresenter.createPoint();
  addPointButtonComponent.getElement().disabled = true;
};

addPointButtonComponent.setAddClickHandler(handleAddClick);

