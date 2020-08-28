import PointEditView from '../view/point-edit.js';
import DaysListView from '../view/days-list.js';
import DayView from '../view/days-item.js';
import PointView from '../view/trip-points.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._daysListComponent = new DaysListView();
  }

  init(points) {
    this._points = points;
    render(this._tripContainer, this._daysListComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _renderPoint(place, point) {
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

    render(place, pointComponent, RenderPosition.BEFOREEND);
  }

  _renderDays() {
    const dates = [
      ...new Set(this._points.map((point) => new Date(point.timeStart).toDateString()))
    ];

    dates.forEach((date, index) => {
      const dayComponent = new DayView(new Date(date), index + 1);

      this._points.filter((point) => new Date(point.timeStart).toDateString() === date).forEach((point) => {
        this._renderPoint(dayComponent.getElement().querySelector(`.trip-events__list`), point);
      });

      render(this._daysListComponent, dayComponent, RenderPosition.BEFOREEND);
    });
  }

  _renderTrip() {
    this._renderDays();
  }
}
