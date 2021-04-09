import {createRouteAndCostTemplate} from './view/route-and-cost.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createListTemplate} from './view/createListTemplate.js';
import {createEventEditTemplate} from './view/event-edit.js';
import {generatePoints} from './mock/point.js';

const LIST_COUNT = 20;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector('.trip-main');
const navigation = tripMain.querySelector('.trip-controls__navigation');
const filter = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const points = generatePoints(20);

render(tripMain, createRouteAndCostTemplate(points[0]), 'afterbegin');
render(navigation, createSiteMenuTemplate(), 'beforeend');
render(filter, createFilterTemplate(), 'beforeend');
render(tripEvents, createSortTemplate(), 'afterbegin');


const tripEventsList = tripEvents.querySelector('.trip-events__list');
render(tripEventsList, createEventEditTemplate(points[0]), 'beforeend');

for (let i = 0; i < LIST_COUNT; i++) {
  render(tripEventsList, createListTemplate(points[i]), 'beforeend');
}

