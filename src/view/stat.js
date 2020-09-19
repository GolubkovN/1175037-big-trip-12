import SmartView from "./smart.js";
import {StatsType} from '../const.js';

const createStatisticsTemplate = ({MONEY, TRANSPORT, TIME_SPEND}) => {
  return (
    `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    <div class="statistics__item statistics__item--${MONEY}">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>
    <div class="statistics__item statistics__item--${TRANSPORT}">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>
    <div class="statistics__item statistics__item--${TIME_SPEND}">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`
  );
};

export default class Stats extends SmartView {
  constructor(points) {

    super();

    this._data = points;
  }

  _getTemplate() {
    return createStatisticsTemplate(StatsType);
  }
}
