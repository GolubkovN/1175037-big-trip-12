import SortingView from '../view/sorting.js';
import PointEditView from '../view/point-edit.js';
import DaysListView from '../view/days-list.js';
import DayView from '../view/days-item.js';
import EmptyDayView from '../view/empty-day.js';
import PointView from '../view/trip-points.js';
import {render, RenderPosition, replace} from '../utils/render.js';
import {SortType} from '../const.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.EVENT;

    this._daysListComponent = new DaysListView();
    this._sortingComponent = new SortingView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points;
    this._sourcedPoints = points.slice();

    render(this._tripContainer, this._daysListComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._points.sort((a, b) => a.duration < b.duration ? 1 : -1);
        break;
      case SortType.PRICE:
        this._points.sort((a, b) => a.pointPrice < b.pointPrice ? 1 : -1);
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearDaysList();
    if (this._currentSortType === SortType.TIME || this._currentSortType === SortType.PRICE) {
      this._renderSortPoints();
    } else {
      this._renderDays();
    }
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

    render(place, pointComponent, RenderPosition.BEFOREEND);
  }

  _renderSortPoints() {
    const EmptyDayComponent = new EmptyDayView();

    this._points
      .forEach((point) => {
        this._renderPoint(EmptyDayComponent.getElement().querySelector(`.trip-events__list`), point);
      });
    render(this._daysListComponent, EmptyDayComponent, RenderPosition.BEFOREEND);
  }

  _renderDays() {
    const dates = [
      ...new Set(this._points.map((point) => new Date(point.timeStart).toDateString()))
    ];

    dates.forEach((date, index) => {
      const dayComponent = new DayView(new Date(date), index + 1);

      this._points
      .filter((point) => new Date(point.timeStart).toDateString() === date)
      .forEach((point) => {
        this._renderPoint(dayComponent.getElement().querySelector(`.trip-events__list`), point);
      });

      render(this._daysListComponent, dayComponent, RenderPosition.BEFOREEND);
    });
  }

  _clearDaysList() {
    this._daysListComponent.getElement().innerHTML = ``;
  }

  _renderTrip() {
    this._renderSort();
    this._renderDays();
  }
}
