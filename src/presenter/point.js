import PointEditView from '../view/point-edit.js';
import PointView from '../view/trip-points.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';

export default class Point {
  constructor(pointContainer, changeData) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFvoriteClick = this._handleFvoriteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    this._pointComponent.setClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormCloseHandler(this._handleFormClose);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setFavoriteClickHandler(this._handleFvoriteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._pointContainer.contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointContainer.contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
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

  _handleFormSubmit(point) {
    this._replaceFormToPoint();
    this._changeData(point);
  }

  _handleFormClose() {
    this._replaceFormToPoint();
  }

  _handleFvoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite,
            }
        )
    );
  }
}
