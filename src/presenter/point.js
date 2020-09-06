import PointEditView from '../view/point-edit.js';
import PointView from '../view/trip-points.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Point {
  constructor(pointContainer) {
    this._pointContainer = pointContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(point) {
    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    this._pointComponent.setClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormCloseHandler(this._handleFormClose);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormClose() {
    this._replaceFormToPoint();
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }
}
