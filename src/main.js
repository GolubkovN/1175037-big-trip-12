import MenuView from './view/menu.js';
import NewEvenetButtonView from './view/new-event-button.js';
import FilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import Api from './api/api.js';
import {render, RenderPosition} from './utils/render.js';
import {MenuItem, UpdateType} from './const.js';

const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic qweqwuyeweyr3ieyriwuery`;

const siteHeaderElement = document.querySelector(`.page-header`);
const menuElement = siteHeaderElement.querySelector(`.trip-main`);
const controlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const tripMainElement = document.querySelector(`.trip-main`);
const pageMainElement = document.querySelector(`.page-body__page-main.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

const api = new Api(END_POINT, AUTHORIZATION);

// Model
const filterModel = new FilterModel();
const pointModel = new PointsModel();

// view
const menuComponent = new MenuView();
const addPointButtonComponent = new NewEvenetButtonView();

// presenters
const tripPresenter = new TripPresenter(
    tripEventsElement,
    menuElement,
    pointModel,
    filterModel,
    addPointButtonComponent,
    api
);
const filterPresenter = new FilterPresenter(controlsElement, filterModel, pointModel);

render(tripMainElement, addPointButtonComponent, RenderPosition.BEFOREEND);

tripPresenter.init();
filterPresenter.init();

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

api.getPoints()
  .then((points) => {
    pointModel.setPoints(UpdateType.INIT, points);
    console.log(points);
    render(controlsElement, menuComponent, RenderPosition.AFTERBEGIN);
    menuComponent.setMenuClickHandler(handleMenuClick);
  })
  .catch(() =>{
    pointModel.setPoints(UpdateType.INIT, []);
    render(controlsElement, menuComponent, RenderPosition.AFTERBEGIN);
    menuComponent.setMenuClickHandler(handleMenuClick);
  });
