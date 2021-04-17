import AbstractView from './abstract.js';

const createRouteAndCostTemplate = (point) => {
  const offers = point.offers;
  const basePrice = point.basePrice;
  const sumOffersCost = (offers) => {
    if (offers.length === 0) {
      return 0;
    }
    const initialValue = 0;
    return offers.reduce((accumulator, currentValue) => accumulator + currentValue.price, initialValue);
  };

  const offersSum = sumOffersCost(offers);

  const tripCost = basePrice + offersSum;

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
  constructor(point) {
    super();
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createRouteAndCostTemplate(this._point);
  }
}
