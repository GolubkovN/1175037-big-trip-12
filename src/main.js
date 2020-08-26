import TripInfoView from './view/trip-info.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import SortingView from './view/sorting.js';
import PointEditView from './view/form-edit.js';
import DaysListView from './view/days-list.js';
import DayView from './view/days-item.js';
import PointView from './view/trip-points.js';
import {generatePoint} from './mock/points.js';
import {renderElement, RenderPosition} from './utils.js';


const POINT_COUNT = 3;

const points = new Array(POINT_COUNT).fill(``).map(generatePoint);

const dates = [
  ...new Set(points.map((point) => new Date(point.timeStart).toDateString()))
];

const renderPoint = (place, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replacePointToForm = () => place.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());

  const replaceFormToPoint = () => place.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());

  const onEscDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscDown);
  });

  pointEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.addEventListener(`keydown`, onEscDown);
  });

  pointEditComponent.getElement().addEventListener(`reset`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.addEventListener(`keydown`, onEscDown);
  });

  renderElement(place, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

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

// days list
const daysListComponent = new DaysListView();
renderElement(tripEventsElement, daysListComponent.getElement(), RenderPosition.BEFOREEND);

dates.forEach((date, index) => {
  const dayComponent = new DayView(new Date(date), index + 1);

  points.filter((point) => new Date(point.timeStart).toDateString() === date).forEach((point) => {
    renderPoint(dayComponent.getElement().querySelector(`.trip-events__list`), point);
  });

  renderElement(daysListComponent.getElement(), dayComponent.getElement(), RenderPosition.BEFOREEND);
});
