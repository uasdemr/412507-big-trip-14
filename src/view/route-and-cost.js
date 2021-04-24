import AbstractView from './abstract.js';

const createRouteAndCostTemplate = (points) => {
  const initialValue = 0;
  // return offers.reduce((accumulator, currentValue) => accumulator + currentValue.price, initialValue);

  const mainTripCost = points.reduce((accumulator, currentValue) => accumulator + currentValue.basePrice, initialValue);
  let offersTripCost = 0;
  for(const point of points) {
    offersTripCost = offersTripCost + point.offers.reduce((accumulator, currentValue) => accumulator + currentValue.price, initialValue);
  }

  const tripCost = mainTripCost + offersTripCost;
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
    </p>
  </section>`;
};


export default class RouteAndCost extends AbstractView {
  constructor(point, points) {
    super();
    this._point = point;
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createRouteAndCostTemplate(this._point, this._points);
  }
}
