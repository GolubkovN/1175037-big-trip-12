import SortingView from '../view/sorting.js';
import DaysListView from '../view/days-list.js';
import DayView from '../view/days-item.js';
import EmptyDayView from '../view/empty-day.js';
import NoPointsView from '../view/no-points.js';
import StatsView from '../view/stat.js';
import PointPresenter from '../presenter/point.js';
import NewEventPresenter from '../presenter/new-event.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction} from '../const.js';

export default class Trip {
  constructor(tripContainer, pointModel, filterModel, newEventButton) {
    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.EVENT;
    this._eventsList =
    this._pointPresenter = {};

    this._sortingComponent = null;
    this._statsComponent = null;

    this._daysListComponent = new DaysListView();
    this._noPointsComponent = new NoPointsView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleChangeMode = this._handleChangeMode.bind(this);

    this._newPointPresenter = new NewEventPresenter(this._daysListComponent, this._handleViewAction, newEventButton);
  }

  init() {
    render(this._tripContainer, this._daysListComponent, RenderPosition.BEFOREEND);
    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderSort();

    if (this._getPoints().length > 0) {
      this._renderTrip({renderSort: false});
    }
  }

  destroy() {
    this._clearTrip({removeSort: true});

    this._pointModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint() {
    this._newPointPresenter.init();
  }

  renderStats() {
    this._statsComponent = new StatsView(this._pointModel.getPoints());
    render(this._tripContainer, this._statsComponent, RenderPosition.BEFOREEND);
  }

  clearStats() {
    remove(this._statsComponent);
  }

  _getPoints() {
    const filterType = this._filterModel.get();
    const points = this._pointModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort((a, b) => b.duration - a.duration);
      case SortType.PRICE:
        return filteredPoints.sort((a, b) => b.pointPrice - a.pointPrice);
    }
    return filteredPoints;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true, removeSort: true});
        this._renderTrip({renderSort: true});
        break;
    }
  }

  _handleChangeMode() {
    this._newPointPresenter.destroy();
    Object.values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip({removeSort: false});
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(place, point) {
    const pointPresenter = new PointPresenter(place, this._handleViewAction, this._handleChangeMode);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderSortPoints() {
    const emptyDayComponent = new EmptyDayView();
    const eventsList = emptyDayComponent.getElement().querySelector(`.trip-events__list`);
    this._getPoints()
      .forEach((point) => this._renderPoint(eventsList, point));
    render(this._daysListComponent, emptyDayComponent, RenderPosition.BEFOREEND);
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
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
        .forEach((point) => this._renderPoint(eventsList, point));

      render(this._daysListComponent, dayComponent, RenderPosition.BEFOREEND);
    });
  }

  _clearTrip({resetSortType, removeSort} = {}) {
    this._newPointPresenter.destroy();
    Object.values(this._pointPresenter)
          .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    this._daysListComponent.clear();

    if (removeSort) {
      remove(this._sortingComponent);
    }

    remove(this._noPointsComponent);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _renderTrip({renderSort} = {}) {
    if (this._getPoints().length === 0) {
      this._renderNoPoints();
    } else {

      if (renderSort) {
        this._renderSort();
      }

      if (this._currentSortType === SortType.TIME || this._currentSortType === SortType.PRICE) {
        this._renderSortPoints();
      } else {
        this._renderDays();
      }
    }
  }
}
