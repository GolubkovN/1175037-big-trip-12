import TripInfoView from './view/trip-info.js';
import TotalPriceView from './view/totalPrice.js';
import WayView from './view/way.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import SortingView from './view/sorting.js';
import PointEditView from './view/form-edit.js';
import DaysListView from './view/days-list.js';
import DayView from './view/days-item.js';
import PointView from './view/trip-points.js';
import NoPointsView from './view/no-points.js';
import {generatePoint} from './mock/points.js';
import {render, RenderPosition, replace} from './utils/render.js';


const POINT_COUNT = 4;

const points = new Array(POINT_COUNT).fill(``).map(generatePoint);

const dates = [
  ...new Set(points.map((point) => new Date(point.timeStart).toDateString()))
];

const renderPoint = (place, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replacePointToForm = () => replace(pointEditComponent, pointComponent);

  const replaceFormToPoint = () => replace(pointComponent, pointEditComponent);

  const onEscDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  pointComponent.setClickHandler(() => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.addEventListener(`keydown`, onEscDown);
  });

  pointEditComponent.setResetFormHandler(() => {
    replaceFormToPoint();
    document.addEventListener(`keydown`, onEscDown);
  });

  render(place, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

// days list
const renderTrip = (tripContainer, tripPoints) => {
  const daysListComponent = new DaysListView();
  render(tripContainer, daysListComponent, RenderPosition.BEFOREEND);

  dates.forEach((date, index) => {
    const dayComponent = new DayView(new Date(date), index + 1);

    tripPoints.filter((point) => new Date(point.timeStart).toDateString() === date).forEach((point) => {
      renderPoint(dayComponent.getElement().querySelector(`.trip-events__list`), point);
    });

    render(daysListComponent, dayComponent, RenderPosition.BEFOREEND);
  });
};

// header
const siteHeaderElement = document.querySelector(`.page-header`);
const menuElement = siteHeaderElement.querySelector(`.trip-main`);
const tripInfoComponent = new TripInfoView();
render(menuElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent, new TotalPriceView(), RenderPosition.BEFOREEND);

const controlsElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
render(controlsElement, new MenuView(), RenderPosition.AFTERBEGIN);
render(controlsElement, new FilterView(), RenderPosition.BEFOREEND);


// sorting
const pageMainElement = document.querySelector(`.page-body__page-main.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

if (points.length === 0) {
  render(tripEventsElement, new NoPointsView(), RenderPosition.BEFOREEND);
} else {
  render(tripInfoComponent.getElement(), new WayView(), RenderPosition.AFTERBEGIN);
  render(tripEventsElement, new SortingView(), RenderPosition.AFTERBEGIN);
  renderTrip(tripEventsElement, points);
}
