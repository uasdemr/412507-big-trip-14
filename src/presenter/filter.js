import FilterView from '../view/filter.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { filter } from '../utils/filter.js';
import { FilterType, UpdateType } from '../view/const.js';

export default class Filter {
  constructor(filterContainer, filterModel, tasksModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tasksModel = tasksModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._tasksModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const points = this._tasksModel.getPoints();
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        count: filter[FilterType.PAST](points).length,
      },
    ];
  }
}
