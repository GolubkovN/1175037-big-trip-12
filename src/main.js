import TripInfoView from './view/trip-info.js';
import MenuView from './view/menu.js';
import NewEvenetButtonView from './view/new-event-button.js';
import FilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import {generatePoint} from './mock/points.js';
import {render, RenderPosition} from './utils/render.js';
import {MenuItem} from './const.js';

const POINT_COUNT = 10;

const points = new Array(POINT_COUNT).fill(``).map(generatePoint).sort((a, b) => a.timeStart - b.timeStart);


// Model
const filterModel = new FilterModel();
const pointModel = new PointsModel();

// header
const siteHeaderElement = document.querySelector(`.page-header`);
const menuElement = siteHeaderElement.querySelector(`.trip-main`);
const tripInfoComponent = new TripInfoView(points);
render(menuElement, tripInfoComponent, RenderPosition.AFTERBEGIN);

// Menu
const menuComponent = new MenuView();
const controlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
render(controlsElement, menuComponent, RenderPosition.AFTERBEGIN);

// button
const tripMainElement = document.querySelector(`.trip-main`);
const addPointButtonComponent = new NewEvenetButtonView();
render(tripMainElement, addPointButtonComponent, RenderPosition.BEFOREEND);

// main content
const pageMainElement = document.querySelector(`.page-body__page-main.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripEventsElement, pointModel, filterModel, addPointButtonComponent);
pointModel.setPoints(points);
tripPresenter.init();
new FilterPresenter(controlsElement, filterModel, pointModel).init();

const handleAddClick = () => {
  tripPresenter.createPoint();
  addPointButtonComponent.disable();
};

addPointButtonComponent.setAddClickHandler(handleAddClick);

// change screen
const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      if (menuComponent.getActiveMenuItem() !== MenuItem.TABLE) {
        menuComponent.setMenuItem(menuItem);
        tripPresenter.clearStats();
        tripPresenter.rerenderTrip();
      }
      break;
    case MenuItem.STATS:
      if (menuComponent.getActiveMenuItem() !== MenuItem.STATS) {
        menuComponent.setMenuItem(menuItem);
        tripPresenter.destroy();
        tripPresenter.renderStats();
      }
      break;
  }
};

menuComponent.setMenuClickHandler(handleMenuClick);
