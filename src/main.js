import {createRouteAndCostTemplate} from './view/route-and-cost.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createListTemplate} from './view/createListTemplate.js';
import {createEventEditTemplate} from './view/event-edit.js';

const LIST_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector('.trip-main');
const navigation = tripMain.querySelector('.trip-controls__navigation');
const filter = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

render(tripMain, createRouteAndCostTemplate(), 'afterbegin');
render(navigation, createSiteMenuTemplate(), 'beforeend');
render(filter, createFilterTemplate(), 'beforeend');
render(tripEvents, createSortTemplate(), 'beforeend');

for (let i = 0; i < LIST_COUNT; i++) {
  render(tripEvents, createListTemplate(), 'beforeend');
}

const tripEventsList = tripEvents.querySelector('.trip-events__list');
render(tripEventsList, createEventEditTemplate(), 'afterbegin');
