import { generatePoints } from './mock/point.js';
import TripPresenter from './presenter/Trip.js';

const tripMain = document.querySelector('.trip-main');
const navigation = tripMain.querySelector('.trip-controls__navigation');
const filter = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const LIST_COUNT = 20;
const points = generatePoints(LIST_COUNT);


const tripPresenter = new TripPresenter (tripEvents, tripMain, navigation, filter);

tripPresenter.init(points);
