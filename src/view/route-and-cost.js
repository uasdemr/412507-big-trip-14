import AbstractView from './abstract.js';

const createRouteAndCostTemplate = (points) => {
  const totalTripCost = points.reduce((acc1, point) => {
    const offersCost = point.offers.reduce((acc2, offer) => acc2 + offer.price, 0);
    return acc1 + point.basePrice + offersCost;
  }, 0);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalTripCost}</span>
    </p>
  </section>`;
};


export default class RouteAndCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createRouteAndCostTemplate(this._points);
  }
}
