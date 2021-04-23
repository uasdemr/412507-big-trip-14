// import { generatePoints } from './mock/point.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import RouteAndCostView from '../view/route-and-cost.js';
import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import eventListView from '../view/list-view.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './Point.js';

const TASK_COUNT_PER_STEP = 20;

export default class Trip {
  constructor(tripContainer, tripMainElement, navigationElement, filterElement) {
    this._tripContainer = tripContainer;
    this._tripMainElement = tripMainElement;
    this._navigationElement = navigationElement;
    this._filterElement = filterElement;
    this._renderedPointCount = TASK_COUNT_PER_STEP;
    this._pointPresenter = {};


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
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._renderBoard();
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
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
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderRouteAndCost() {
    // Метод для рендеринга сортировки
    this._routeAndCostComponent = new RouteAndCostView(this._tripPoints[0]);
    render(this._tripMainElement, this._routeAndCostComponent, RenderPosition.AFTERBEGIN);
  }
  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilter() {
    // Метод для рендеринга фильтра
    this._filterComponent = new FilterView(this._tripPoints);
    render(this._filterElement, this._filterComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNavigation() {
    // Метод для рендеринга навигации
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
    this._renderedPointCount = TASK_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderTrips() {
    // Метод для рендеринга N-задач за раз
    for (const point of this._tripPoints) {
      this._renderTrip(point);
    }
  }

  _renderNoPoints() {
    // Метод для рендеринга заглушки
    render(this._tripContainer, this._noPointComponents, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
    if (this._tripPoints.length !== 0) {
      this._renderSort();
      this._renderRouteAndCost();
      render(this._tripContainer, this._eventListComponent, RenderPosition.BEFOREEND);
      this._renderTrips();
    }
    else {
      this._renderNoPoints();
    }
    this._renderNavigation();
    this._renderFilter();
  }
}
