import { isFeature, isPast, isBetween } from '../utils/point.js';
import {FilterType} from '../view/const.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => {
    return (isFeature(point.dateFrom)  || isBetween(point));
  }),
  [FilterType.PAST]: (points) => points.filter((point) => {
    return (isPast(point.dateTo) || isBetween(point));
  }),
};
