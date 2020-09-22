import StatsView from '../view/stat.js';
import {render, RenderPosition, remove} from '../utils/render.js';

export default class Stat {
  constructor(container) {
    this._container = container;
    this._statComponent = null;
  }

  init(points) {
    this._statComponent = new StatsView(points);
    render(this._container, this._statComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._statComponent);
  }
}
