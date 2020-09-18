import PointEditView from '../view/point-edit.js';
import {generateId} from '../utils/point.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

export default class NewEvent {
  constructor(pointsContainer, changeData) {
    this._pointsContainer = pointsContainer;
    this._changeData = changeData;

    this._newPointComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._onEscKeyDownHandler = this._onEscKeyDownHandler.bind(this);
  }

  init() {
    if (this._newPointComponent !== null) {
      return;
    }

    this._newPointComponent = new PointEditView();
    this._newPointComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._newPointComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._newPointComponent.setFormCloseHandler(this._handleCloseClick);

    render(this._pointsContainer, this._newPointComponent, RenderPosition.BEFOREBEGIN);
    document.addEventListener(`keydown`, this._onEscKeyDownHandler);
  }

  destroy() {
    if (this._newPointComponent === null) {
      return;
    }

    remove(this._newPointComponent);
    this._newPointComponent = null;
    document.removeEventListener(`keydown`, this._onEscKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, point)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _handleCloseClick() {
    this.destroy();
  }

  _onEscKeyDownHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
