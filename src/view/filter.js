import { isFeature, isPast } from '../utils/utils.js';
import AbstractView from './abstract.js';

const pointToFilterMap = {
  everything: (points) => points.length,
  future: (points) => points.filter((point) => isFeature(point.dateFrom)).length,
  past: (points) => points.filter((point) => isPast(point.dateTo)).length,
};

const generateFilter = (points) => {
  return Object.entries(pointToFilterMap).map(([filterName, countPoints]) => {
    return {
      name: filterName,
      count: countPoints(points),
    };
  });
};

const createFilterItem = (filter) => {
  return filter.map((item) => {
    return `<div class="trip-filters__filter">
      <input id="filter-${item.name}" class="trip-filters__filter-input  visually-hidden" type="radio" value="${item.name}" />
      <label class="trip-filters__filter-label" for="filter-${item.name}">${item.name} ${item.count}</label>
    </div>`;
  }).join('');
};

export const createFilterTemplate = (filter) => {
  return `<form class="trip-filters" action="#" method="get">
    ${createFilterItem(filter)}


    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};


export default class Filter extends AbstractView {
  constructor(points) {
    super();
    this._filters = generateFilter(points);
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}

