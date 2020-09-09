import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._point = {};
  }

  updateData(updated, justDataUpdating) {
    if (!updated) {
      return;
    }

    this._point = Object.assign(
        {},
        this._point,
        updated
    );

    if (justDataUpdating) {
      return;
    }

    this._updateElement();
  }

  _updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }
}
