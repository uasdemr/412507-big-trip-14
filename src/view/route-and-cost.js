import dayjs from 'dayjs';

import SmartView from './smart.js';

const MAX_SHOWED_CITIES_COUNT = 3;

const getTripInfoDates = (points) => {
  if (!points.length) {
    return '';
  }

  const isOnePoint = points.length > 0 ? dayjs(points[0].dateFrom) : '';
  const moreThenOnePoint = points.length > 1 ? dayjs(points[points.length - 1].dateFrom) : '';

  return `${isOnePoint.format('DD MMM')} &mdash; ${isOnePoint.month() !== moreThenOnePoint.month() ? moreThenOnePoint.format('DD MMM') : moreThenOnePoint.format('DD')}`;
};

const getTripInfoTitle = (points) => {
  if (!points.length) {
    return '';
  }

  if (points.length > MAX_SHOWED_CITIES_COUNT) {
    return `${points[0].destination.name} &mdash; ... &mdash; ${points[points.length - 1].destination.name}`;
  } else {
    const isOnePoint = points.length === 1 ? points[0].destination.name : '';
    const onlyTwoPoints = points.length === 2 ? points[1].destination.name : '...';
    const onlyThreePoints = points.length === 3 ? points[2].destination.name : '';

    return `${isOnePoint} &mdash; ${onlyTwoPoints} &mdash; ${onlyThreePoints}`;
  }
};

const createRouteAndCostTemplate = (points) => {
  const totalTripCost = points.reduce((acc1, point) => {
    const offersCost = point.offers.reduce((acc2, offer) => acc2 + offer.price, 0);
    return acc1 + point.basePrice + offersCost;
  }, 0);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripInfoTitle(points)}</h1>

      <p class="trip-info__dates">${getTripInfoDates(points)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalTripCost}</span>
    </p>
  </section>`;
};


export default class RouteAndCost extends SmartView {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
    this._element = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  getTemplate() {
    return createRouteAndCostTemplate(this._pointsModel.getPoints());
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    this.updateElement();
  }
}
