import {createRouteAndCostTemplate} from './view/route-and-cost.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createListTemplate} from './view/create-list-template.js';
import {createEventEditTemplate} from './view/event-edit.js';
import {generatePoints} from './mock/point.js';
import {generateFilter} from './view/filter.js';

const LIST_COUNT = 20;
const points = generatePoints(LIST_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const filters = generateFilter(points);
const tripMain = document.querySelector('.trip-main');
const navigation = tripMain.querySelector('.trip-controls__navigation');
const filter = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');


render(tripMain, createRouteAndCostTemplate(points[0]), 'afterbegin');
render(navigation, createSiteMenuTemplate(), 'beforeend');
render(filter, createFilterTemplate(filters), 'beforeend');
render(tripEvents, createSortTemplate(), 'afterbegin');


const tripEventsList = tripEvents.querySelector('.trip-events__list');
render(tripEventsList, createEventEditTemplate(points[0]), 'beforeend');

for(const point of points) {
  render(tripEventsList, createListTemplate(point), 'beforeend');
}
