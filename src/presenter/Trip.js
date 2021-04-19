// import { generatePoints } from './mock/point.js';
import { render, RenderPosition, replace } from '../utils/render.js';
import RouteAndCostView from '../view/route-and-cost.js';
import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import PointView from '../view/point.js';
import EventEditView from '../view/event-edit.js';
import eventListView from '../view/list-view.js';
import NoPointView from '../view/no-point.js';

export default class Trip {
  constructor(tripContainer, tripMainElement, navigationElement, filterElement) {
    this._tripContainer = tripContainer;
    this._tripMainElement = tripMainElement;
    this._navigationElement = navigationElement;
    this._filterElement = filterElement;


    this._siteMenuComponent = new SiteMenuView();
    this._sortComponent = new SortView();
    this._eventListComponent = new eventListView();
    this._noPointComponents = new NoPointView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._renderBoard();
  }

  _renderRouteAndCost() {
    // Метод для рендеринга сортировки
    this._routeAndCostComponent = new RouteAndCostView(this._tripPoints[0]);
    render(this._tripMainElement, this._routeAndCostComponent, RenderPosition.AFTERBEGIN);
  }
  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
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
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
    const pointComponent = new PointView(point);
    const eventEditComponent = new EventEditView(point);

    const replacePointToForm = () => {
      replace(eventEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, eventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setFormClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this._eventListComponent, pointComponent, RenderPosition.BEFOREEND);

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
