import TripInfoView from '../view/trip-info.js';
import SortingView from '../view/sorting.js';
import DaysListView from '../view/days-list.js';
import DayView from '../view/days-item.js';
import EmptyDayView from '../view/empty-day.js';
import NoPointsView from '../view/no-points.js';
import StatPresenter from '../presenter/stat.js';
import PointPresenter from '../presenter/point.js';
import LoadingView from '../view/loading.js';
import NewEventPresenter from '../presenter/new-event.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction} from '../const.js';

export default class Trip {
  constructor(tripContainer, tripInfoContainer, pointModel, filterModel, newEventButton, api) {
    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._api = api;
    this._currentSortType = SortType.EVENT;
    this._pointPresenter = {};
    this._isLoading = true;

    this._sortingComponent = null;
    this._tripInfoComponent = null;

    this._statPresenter = new StatPresenter(this._tripContainer);
    this._daysListComponent = new DaysListView();
    this._noPointsComponent = new NoPointsView();
    this._loadingComponent = new LoadingView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleChangeMode = this._handleChangeMode.bind(this);
    this._handleInfoUpdate = this._handleInfoUpdate.bind(this);

    this._pointModel.addObserver(this._handleModelEvent);
    this._pointModel.addObserver(this._handleInfoUpdate);
    this._filterModel.addObserver(this._handleModelEvent);

    this._newPointPresenter = new NewEventPresenter(this._daysListComponent, this._handleViewAction, newEventButton);
  }

  init() {
    render(this._tripContainer, this._daysListComponent, RenderPosition.BEFOREEND);

    this._renderTrip({renderSort: true});
  }

  rerenderTrip() {
    this.destroy();
    this.init();
  }

  destroy() {
    this._clearTrip({removeSort: true});
  }

  createPoint() {
    this._newPointPresenter.init();
  }

  renderStats() {
    this._statPresenter.init(this._pointModel.getPoints());
  }

  clearStats() {
    this._statPresenter.destroy();
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
        this._api.updatePoints(update).then((response) => {
          this._pointModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.ADD_POINT:
        this._api.addPoint(update).then((response) => {
          this._pointModel.addPoint(updateType, response);
        });
        break;
      case UserAction.DELETE_POINT:
        this._api.deletePoint(update).then(() => {
          this._pointModel.deletePoint(updateType, update);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip({removeSort: true});
        this._renderTrip({renderSort: true});
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true, removeSort: true});
        this._renderTrip({renderSort: true});
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
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
    this._renderTrip({renderSort: false});
  }

  _handleInfoUpdate() {
    this._renderTripInfo();
  }

  _renderTripInfo() {
    this._tripInfoComponent = new TripInfoView(this._pointModel.getPoints());
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
  }

  _removeSort() {
    if (this._sortingComponent !== null) {
      remove(this._sortingComponent);
    }
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

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.BEFOREEND);
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
      this._removeSort();
    }

    remove(this._noPointsComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _renderTrip({renderSort} = {}) {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    if (this._getPoints().length === 0) {
      this._renderNoPoints();
      return;
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
