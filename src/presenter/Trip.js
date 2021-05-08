import { render, RenderPosition, remove } from '../utils/render.js';
import { SortType, UpdateType, UserAction } from '../view/const.js';
import { sortTimeDown, sortPriceDown, sortDefault } from '../utils/point.js';
import { filter } from '../utils/filter.js';

import RouteAndCostView from '../view/route-and-cost.js';
import SiteMenuView from '../view/site-menu.js';
import SortView from '../view/sort.js';
import eventListView from '../view/list-view.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './point.js';
import FilterPresenter from '../presenter/filter.js';
import FilterModel from '../model/filter-model.js';


const filterModel = new FilterModel();

export default class Trip {
  constructor(tripContainer, tripMainElement, navigationElement, filterElement, pointsModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._tripMainElement = tripMainElement;
    this._navigationElement = navigationElement;
    this._filterElement = filterElement;
    this._pointPresenter = {};
    this._filterPresenter = new FilterPresenter(this._filterElement, this._filterModel, this._pointsModel);
    this._currentSortType = SortType.DEFAULT;

    this._siteMenuComponent = new SiteMenuView();
    this._sortComponent = null;
    this._eventListComponent = new eventListView();
    this._noPointComponent = new NoPointView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderBoard();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter().toLowerCase();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME_DOWN:
        return filtredPoints.sort(sortTimeDown);
      case SortType.PRICE_DOWN:
        return filtredPoints.sort(sortPriceDown);
      case SortType.DEFAULT:
        return filtredPoints.sort(sortDefault);
    }
    return filtredPoints;
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrips(this._getPoints());
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearTrip();
        remove(this._routeAndCostComponent);
        this._renderRouteAndCost();
        this._renderTrips(this._getPoints());
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearBoard({ resetSortType: true });
        this._renderBoard();
        break;
    }
  }

  _renderRouteAndCost() {
    this._routeAndCostComponent = new RouteAndCostView(this._pointsModel.getPoints());
    render(this._tripMainElement, this._routeAndCostComponent, RenderPosition.AFTERBEGIN);
  }
  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNavigation() {
    render(this._navigationElement, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip(point) {
    const pointPresenter = new PointPresenter(this._eventListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderTrips(points) {
    for (const point of points) {
      this._renderTrip(point);
    }
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    const points = this._getPoints();
    const pointCount = points.length;
    this._filterPresenter.init();

    if (pointCount === 0) {
      this._renderNoPoints();
    }
    this._renderSort();
    this._renderRouteAndCost();
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderTrips(points);
    this._renderNavigation();
  }

  _clearTrip() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _clearBoard({ resetSortType = false } = {}) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._routeAndCostComponent);
    remove(this._sortComponent);
    remove(this._noPointComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
