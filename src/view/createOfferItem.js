const createOfferItem = (offers) => {
  // console.log(offers);
  let template = '';
  for(const offer of offers) {
    template += `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">20</span>
    </li>`;
  }
  return template;
};

export {createOfferItem};
