import SortingView from '../view/sorting.js';
import DaysListView from '../view/days-list.js';
import DayView from '../view/days-item.js';
import EmptyDayView from '../view/empty-day.js';
import PointPresenter from '../presenter/point.js';
import {render, RenderPosition} from '../utils/render.js';
import {SortType} from '../const.js';

export default class Trip {
  constructor(tripContainer, pointModel) {
    this._pointModel = pointModel;
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.EVENT;
    this._pointPresenter = {};

    this._daysListComponent = new DaysListView();
    this._sortingComponent = new SortingView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleChandgeMode = this._handleChandgeMode.bind(this);
  }

  init() {
    render(this._tripContainer, this._daysListComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._pointModel.getPoints().slice().sort((a, b) => b.duration - a.duration);
      case SortType.PRICE:
        return this._pointModel.getPoints().slice().sort((a, b) => b.pointPrice - a.pointPrice);
    }

    return this._pointModel.getPoints();
  }

  _handlePointChange(updatedPoint) {
    // заменим на другой метод
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleChandgeMode() {
    Object.values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
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
    const pointPresenter = new PointPresenter(place, this._handlePointChange, this._handleChandgeMode);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderSortPoints() {
    const emptyDayComponent = new EmptyDayView();
    const eventsList = emptyDayComponent.getElement().querySelector(`.trip-events__list`);
    this._getPoints()
      .forEach((point) => {
        this._renderPoint(eventsList, point);
      });
    render(this._daysListComponent, emptyDayComponent, RenderPosition.BEFOREEND);
  }

  _renderDays() {
    const dates = [
      ...new Set(this._getPoints().map((point) => new Date(point.timeStart).toDateString()))
    ];

    dates.forEach((date, index) => {
      const dayComponent = new DayView(new Date(date), index + 1);
      const eventsList = dayComponent.getElement().querySelector(`.trip-events__list`);

      this._getPoints()
        .filter((point) => new Date(point.timeStart).toDateString() === date)
        .forEach((point) => {
          this._renderPoint(eventsList, point);
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
