import { render, RenderPosition } from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import RouteAndCostView from '../view/route-and-cost.js';
import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import eventListView from '../view/list-view.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './point.js';

import {SortType} from '../view/const.js';
import {sortTimeDown, sortPriceDown} from '../utils/point.js';

export default class Trip {
  constructor(tripContainer, tripMainElement, navigationElement, filterElement, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripContainer = tripContainer;
    this._tripMainElement = tripMainElement;
    this._navigationElement = navigationElement;
    this._filterElement = filterElement;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._siteMenuComponent = new SiteMenuView();
    this._sortComponent = new SortView();
    this._eventListComponent = new eventListView();
    this._noPointComponents = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._sourcedTripPoints = tripPoints.slice();

    this._renderBoard();
  }

  _getPoints() {
    return this._tasksModel.getPoints();
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearTripList();
    this._renderTrips();
    // - Очищаем список
    // - Рендерим список заново
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME_DOWN:
        this._tripPoints.sort(sortTimeDown);
        break;
      case SortType.PRICE_DOWN:
        this._tripPoints.sort(sortPriceDown);
        break;
      default:
        this._tripPoints = this._sourcedTripPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _renderRouteAndCost() {
    this._routeAndCostComponent = new RouteAndCostView(this._tripPoints);
    render(this._tripMainElement, this._routeAndCostComponent, RenderPosition.AFTERBEGIN);
  }
  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilter() {
    this._filterComponent = new FilterView(this._tripPoints);
    render(this._filterElement, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNavigation() {
    render(this._navigationElement, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }


  _renderTrip(point) {
    const pointPresenter = new PointPresenter(this._eventListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearTripList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    // remove(this._loadMoreButtonComponent);
  }

  _renderTrips() {
    for (const point of this._tripPoints) {
      this._renderTrip(point);
    }
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointComponents, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if (this._tripPoints.length === 0) {
      this._renderNoPoints();
    }
    else {
      this._renderSort();
      this._renderRouteAndCost();
      render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
      this._renderTrips();
    }
    this._renderNavigation();
    this._renderFilter();
  }
}
