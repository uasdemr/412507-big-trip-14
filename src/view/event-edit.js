import { timeMakerDayJs, createElement } from '../utils/utils.js';
import { offers } from '../mock/point.js';
import { EVENT_TYPES } from './const.js';

const createEventDestination = (destination) => {

  const imgCreator = (pictures) => {

    return pictures.map((picture) => {
      return `<img class="event__photo"
        src="${picture.src}"
        alt="${picture.description}"
      >`;
    }).join('');
  };

  return destination.description === '' ? '' : `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${imgCreator(destination.pictures)}
      </div>
    </div>
  </section>`;


};

const createEditFormOffersItem = (point) => {
  return offers.find((it) => it.type === point.type).offers.map((offer, index) => {
    const сhecked = point.offers.some((it) => it.title === offer.title);
    return `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="event-offer-${point.type}-${index}" type="checkbox" ${сhecked ? 'checked' : ''}>
         <label class="event__offer-label for="event-offer-${point.type}-${index}">
           <span class="event__offer-title">${offer.title}</span>
           &plus;&euro;&nbsp;
           <span class="event__offer-price">${offer.price}</span>
         </label>
       </div>`;
  }).join('');
};

const createEditFormOffers = (point) => {
  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createEditFormOffersItem(point)}
    </div>
    </section>`;
};


const createEventEditTemplate = (point) => {
  const dates = timeMakerDayJs(point);
  const eventTypeItem = () => {
    return Object.entries(EVENT_TYPES).map(([key, val]) => {
      return `<div class="event__type-item">
        <input class="event__type-input  visually-hidden" type="radio" value="${key.toLowerCase()}">
        <label class="event__type-label  event__type-label--${key.toLowerCase()}">${val}</label>
      </div>`;
    }).join('');
  };

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypeItem()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dates.editFormFormatedData.eventStartTimeDateTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dates.editFormFormatedData.eventEndTimeDateTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createEditFormOffers(point)}
        ${createEventDestination(point.destination)}
      </section>
    </form>
  </li>`;
};

export default class EventEdit {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
