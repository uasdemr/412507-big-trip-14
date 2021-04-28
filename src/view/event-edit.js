import { timeMakerDayJs } from '../utils/point.js';
import { offers, destinations } from '../mock/point.js';
import { EVENT_TYPES } from './const.js';
import SmartView from './smart.js';

const createEventDestination = (point) => {
  const imgCreator = (pictures) => {

    return pictures.map((picture) => {
      return `<img class="event__photo"
        src="${picture.src}"
        alt="${picture.description}"
      >`;
    }).join('');
  };

  const destination = destinations.find((it) => it.name === point.destination.name);

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

const createEditFormOffersItem = (allOffers, point) => {
  return allOffers.map((offer, index) => {
    const сhecked = point.offers.some((it) => it.title === offer.title);
    return `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="event-offer-${point.type}-${index}" type="checkbox" ${сhecked ? 'checked' : ''}>
         <label class="event__offer-label" for="event-offer-${point.type}-${index}">
           <span class="event__offer-title">${offer.title}</span>
           &plus;&euro;&nbsp;
           <span class="event__offer-price">${offer.price}</span>
         </label>
       </div>`;
  }).join('');
};

const createEditFormOffers = (point) => {
  const allOffers = offers.find((it) => it.type === point.type).offers;
  const isLength = allOffers.length === 0 ? 'visually-hidden' : '';
  return `<section class="event__section  event__section--offers ${isLength}">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createEditFormOffersItem(allOffers, point)}
    </div>
    </section>`;
};

const createPointDestinationList = () => {
  return destinations.map((item) => {
    return `<option value="${item.name}">${item.name}</option>`;
  }).join('');
};

const createEventEditTemplate = (point) => {
  const dates = timeMakerDayJs(point);
  const eventTypeItem = () => {
    return Object.entries(EVENT_TYPES).map(([key, val]) => {
      return `<div class="event__type-item">
        <input id="event-type-${key}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${key}">
        <label class="event__type-label event__type-label--${key}" for="event-type-${key}">${val}</label>
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
            ${createPointDestinationList()}
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
        ${createEventDestination(point)}
      </section>
    </form>
  </li>`;
};

export default class EventEdit extends SmartView {
  constructor(point) {
    super();
    this._data = EventEdit.parsePointToData(point);
    this._element = null;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formBtnCloseClickHandler = this._formBtnCloseClickHandler.bind(this);

    this._eventEditTypeChangeHandler = this._eventEditTypeChangeHandler.bind(this);
    this._eventEditDestinationChangeHandler = this._eventEditDestinationChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(point) {
    this.updateData(
      EventEdit.parsePointToData(point));
  }

  getTemplate() {
    return createEventEditTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormClickHandler(this._callback.formCloseClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('.event__type-input').forEach((e) => e.addEventListener('change', this._eventEditTypeChangeHandler));
    this.getElement().querySelector('.event__input').addEventListener('change', this._eventEditDestinationChangeHandler);
  }

  // Написать два метода обработчика, один для типа точки, второй для пункта назначения
  _eventEditTypeChangeHandler(evt) {
    this.updateData({
      type: evt.target.value,
    });
    this.updateElement();
  }

  _eventEditDestinationChangeHandler(evt) {
    this.updateData({
      destination: {name: evt.target.value},
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToPoint(this._data));
  }

  _formBtnCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.formCloseClick(evt);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }
  setFormClickHandler(callback) {
    this._callback.formCloseClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formBtnCloseClickHandler);
  }

  static parsePointToData(task) {
    return Object.assign({}, task);
  }

  static parseDataToPoint(data) {
    return Object.assign({}, data);
  }
}
