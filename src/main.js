import RouteAndCostView from './view/route-and-cost.js';
import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import PointView from './view/point.js';
import EventEditView from './view/event-edit.js';
import { generatePoints } from './mock/point.js';
import { render, RenderPosition } from './utils/utils.js';
import eventListView from './view/list-view.js';
import NoPointView from './view/no-point.js';


const tripMain = document.querySelector('.trip-main');
const navigation = tripMain.querySelector('.trip-controls__navigation');
const filter = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const listComponent = new eventListView();

const renderPoint = (taskListElement, point) => {
  const pointComponent = new PointView(point);
  const eventEditComponent = new EventEditView(point);

  const replacePointToForm = () => {
    taskListElement.replaceChild(eventEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    taskListElement.replaceChild(pointComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
  });

  render(taskListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const LIST_COUNT = 20;
const points = generatePoints(LIST_COUNT);

if (points.length !== 0) {
  render(tripEvents, new SortView().getElement(), RenderPosition.AFTERBEGIN);
  render(tripMain, new RouteAndCostView(points[0]).getElement(), RenderPosition.AFTERBEGIN);
  for (const point of points) {
    renderPoint(listComponent.getElement(), point);
  }
} else {
  render(tripEvents, new NoPointView().getElement(), RenderPosition.BEFOREEND);
}

render(navigation, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(filter, new FilterView(points).getElement(), RenderPosition.BEFOREEND);

render(tripEvents, listComponent.getElement(), RenderPosition.BEFOREEND);
