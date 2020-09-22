import PointsModel from '../model/points.js';

const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const SuccesStatusRange = {
  MIN: 200,
  MAX: 299,
};

const UrlTypes = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authirization = authorization;
  }

  getPoints() {
    return this._load({url: UrlTypes.POINTS})
      .then(Api.toJSON)
      .then((points) => points.map(PointsModel.adaptToClient));
  }

  updatePoints(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  getDestinations() {
    return this._load({url: UrlTypes.DESTINATIONS})
      .then(Api.toJSON);
  }

  getOffers() {
    return this._load({url: UrlTypes.OFFERS})
    .then(Api.toJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append(`Authorization`, this._authirization);
    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
    .then(Api.checkStatus)
    .then(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccesStatusRange.MIN
      && response.status > SuccesStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(err) {
    throw err;
  }

  static toJSON(response) {
    return response.json();
  }
}
