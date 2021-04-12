import RouteAndCostView from './view/route-and-cost.js';
import SiteMenuView from './view/site-menu.js';
import { generateFilter } from './view/filter.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import ListView from './view/list-template.js';
import EventEditView from './view/event-edit.js';
import { generatePoints } from './mock/point.js';
import { render, RenderPosition } from './mock/utils.js';

const LIST_COUNT = 20;
const points = generatePoints(LIST_COUNT);

const filters = generateFilter(points);
const tripMain = document.querySelector('.trip-main');
const navigation = tripMain.querySelector('.trip-controls__navigation');
const filter = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');


render(tripMain, new RouteAndCostView(points[0]).getElement(), RenderPosition.AFTERBEGIN);
render(navigation, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(filter, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new SortView().getElement(), RenderPosition.AFTERBEGIN);


const tripEventsList = tripEvents.querySelector('.trip-events__list');
render(tripEventsList, new EventEditView(points[0]).getElement(), RenderPosition.AFTERBEGIN);

for (const point of points) {
  render(tripEventsList, new ListView(point).getElement(), RenderPosition.BEFOREEND);
}
