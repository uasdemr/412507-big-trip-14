const createEditFormOffers = (point) => {
  let template = '';
  for(const offer of point.offers) {
    template += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" type="checkbox" checked>
      <label class="event__offer-label">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }
  return template;
};

export {createEditFormOffers};
