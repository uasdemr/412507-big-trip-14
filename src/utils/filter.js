import { isFeature, isPast } from '../utils/point.js';
import {FilterType} from '../view/const.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFeature(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dateTo)),
};
