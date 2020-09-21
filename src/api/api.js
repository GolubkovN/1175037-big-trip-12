const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const succesStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authirization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
            .then(Api.toJSON);
  }

  updatePoints(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({"Content-Type": `application/json`})
    })
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
      response.status < succesStatusRange.MIN
      && response.status > succesStatusRange.MAX
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
