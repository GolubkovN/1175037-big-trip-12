import Observer from './observer.js';

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, updatedItem) {
    const index = this._points.findIndex((point) => point.id === updatedItem.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point!`);
    }

    this._points = [
      ...this._points.slice(0, index),
      updatedItem,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, updatedItem);
  }

  addPoint(updateType, addedItem) {
    this._points = [addedItem, ...this._points];
    this._points.sort((a, b) => a.timeStart - b.timeStart);

    this._notify(updateType, addedItem);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point!`);
    }

    this._points = [...this._points.slice(0, index), ...this._points.slice(index + 1)];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          pointPrice: point.base_price,
          timeStart: point[`date_from`] = new Date(point.date_from),
          timeEnd: point[`date_to`] = new Date(point.date_to),
          isFavorite: point.is_favorite
        }
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          'base_price': point.pointPrice,
          'date_from': point.timeStart instanceof Date ? point.timeStart.toISOString() : null,
          'date_to': point.timeEnd instanceof Date ? point.timeEnd.toISOString() : null,
          'is_favorite': point.isFavorite
        }
    );

    delete adaptedPoint.pointPrice;
    delete adaptedPoint.timeStart;
    delete adaptedPoint.timeEnd;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
