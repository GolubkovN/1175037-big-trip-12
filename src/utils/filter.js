import {FilterType} from '../const.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => point.timeStart > new Date()),
  [FilterType.PAST]: (points) => points.filter((point) => point.timeStart < new Date()),
};
