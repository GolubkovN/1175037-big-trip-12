import Abstract from './abstract.js';
import {MenuItem} from '../const.js';

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a id="${MenuItem.TABLE}" class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a id="${MenuItem.STATS}" class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class Menu extends Abstract {
  constructor() {
    super();
    this._activeMenuItem = MenuItem.TABLE;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelectorAll(`.trip-tabs__btn`)
      .forEach((item) => item.addEventListener(`click`, this._menuClickHandler));
  }

  setMenuItem(menuItem) {
    const tableItem = this.getElement().querySelector(`#${MenuItem.TABLE}`);
    const statsItem = this.getElement().querySelector(`#${MenuItem.STATS}`);
    this._activeMenuItem = menuItem;
    const activeClass = `trip-tabs__btn--active`;

    switch (this._activeMenuItem) {
      case tableItem:
        this._activeMenuItem.classList.add(activeClass);
        statsItem.classList.remove(activeClass);
        break;
      case statsItem:
        tableItem.classList.remove(activeClass);
        this._activeMenuItem.classList.add(activeClass);
        break;
    }
  }

  getActiveMenuItem() {
    return this._activeMenuItem;
  }
}
