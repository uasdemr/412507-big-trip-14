import { timeMakerDayJs } from '../utils/point.js';
import AbstractView from './abstract.js';

const createOfferItem = (offers) => {
  return offers.map((offer) => {
    return `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`;
  }).join('');
};

const createListTemplate = (point) => {
  const eventFavoriteBtnClassName = point.isFavorite ? 'event__favorite-btn--active' : '';
  const dateObj = timeMakerDayJs(point);
  const event = `${point.type} ${point.destination.name}`;

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateObj.eventDateDateTime}">${dateObj.eventDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${event}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateObj.eventStartTimeDateTime}">${dateObj.eventStartTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateObj.eventEndTimeDateTime}">${dateObj.eventEndTime}</time>
        </p>
        <p class="event__duration">${dateObj.eventDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOfferItem(point.offers)}
      </ul>
      <button class="event__favorite-btn ${eventFavoriteBtnClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends AbstractView{
  constructor(point) {
    super();
    this._point = point;
    this._element = null;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createListTemplate(this._point);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
