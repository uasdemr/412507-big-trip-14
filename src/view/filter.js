import AbstractView from './abstract.js';

const createFilterItem = (filter, currentFilterType) => {
  console.log(filter, currentFilterType);
  return filter.map((item) => {
    console.log(item.type);
    return `<div class="trip-filters__filter">
      <input
        id="filter-${item.name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio" value="${item.name}"
        ${item.type === currentFilterType.toLowerCase() ? 'checked' : ''}
      />
      <label class="trip-filters__filter-label"
        for="filter-${item.name}">${item.name} ${item.count}
      </label>
    </div>`;
  }).join('');
};

export const createFilterTemplate = (filter, currentFilterType) => {
  return `<form class="trip-filters" action="#" method="get">
    ${createFilterItem(filter, currentFilterType)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};


export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}

