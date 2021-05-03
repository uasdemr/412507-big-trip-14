import { render, RenderPosition, remove } from '../utils/render.js';
// import { updateItem } from '../utils/common.js';
import RouteAndCostView from '../view/route-and-cost.js';
import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import eventListView from '../view/list-view.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './point.js';

import { SortType, UpdateType, UserAction } from '../view/const.js';
import { sortTimeDown, sortPriceDown } from '../utils/point.js';

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
    // this._sortComponent = new SortView();
    this._sortComponent = null;
    this._eventListComponent = new eventListView();
    this._noPointComponent = new NoPointView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    // this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    // this._tripPoints = tripPoints.slice();
    // this._sourcedTripPoints = tripPoints.slice();
    this._renderBoard();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.TIME_DOWN:
        return this._pointsModel.getTasks().slice().sort(sortTimeDown);
      case SortType.PRICE_DOWN:
        return this._tasksModel.getTasks().slice().sort(sortPriceDown);
    }
    return this._pointsModel.getPoints();
  }

  _handleSortTypeChange(sortType) {
    console.log(this._currentSortType, sortType);
    // - Сортируем задачи
    if (this._currentSortType === sortType) {
      return;
    }

    // this._sortPoints(sortType);
    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrips(this._pointsModel.getPoints());
    // - Очищаем список
    // - Рендерим список заново
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  // _handlePointChange(updatedPoint) {
  //   // this._tripPoints = updateItem(this._tripPoints, updatedPoint);
  //   // this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
  //   this._pointPresenter[updatedPoint.id].init(updatedPoint);
  // }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType);
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
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearTrip();
        this._renderTrips(this._pointsModel.getPoints());
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  // _sortPoints(sortType) {
  //   switch (sortType) {
  //     case SortType.TIME_DOWN:
  //       this._tripPoints.sort(sortTimeDown);
  //       break;
  //     case SortType.PRICE_DOWN:
  //       this._tripPoints.sort(sortPriceDown);
  //       break;
  //     default:
  //       this._tripPoints = this._sourcedTripPoints.slice();
  //   }

  //   this._currentSortType = sortType;
  // }

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

  _renderFilter() {
    this._filterComponent = new FilterView(this._pointsModel.getPoints());
    render(this._filterElement, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNavigation() {
    render(this._navigationElement, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip(point) {
    // const pointPresenter = new PointPresenter(this._eventListComponent, this._handlePointChange, this._handleModeChange);
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
    const points = this._pointsModel.getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoints();
    }
    this._renderSort();
    this._renderRouteAndCost();
    render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
    this._renderTrips(this._pointsModel.getPoints());
    this._renderNavigation();
    this._renderFilter();
  }

  _clearTrip() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _clearBoard({resetSortType = false} = {}) {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._noPointComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
