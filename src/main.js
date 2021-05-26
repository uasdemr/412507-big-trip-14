import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points-model.js';
import { UpdateType } from './view/const.js';
import { render, RenderPosition, remove } from './utils/render.js';
import LoadingView from './view/loading.js';
import Api from './api.js';

const tripMain = document.querySelector('.trip-main');
const navigation = tripMain.querySelector('.trip-controls__navigation');
const filter = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const AUTHORIZATION = 'Basic hS2sdd3ddfSfwcgl1sa2j';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const pointsModel = new PointsModel();
const api = new Api(END_POINT, AUTHORIZATION);

const loadingComponent = new LoadingView();
render(tripEvents, loadingComponent, RenderPosition.AFTERBEGIN);

Promise.all([api.getPoints(), api.getOffers(), api.getDestinations()])
  .then(([points, offers, destinations]) => {
    const tripPresenter = new TripPresenter(tripEvents, tripMain, navigation, filter, pointsModel, offers, destinations);

    pointsModel.setPoints(UpdateType.INIT, points);
    remove(loadingComponent);
    tripPresenter.init();
  });
