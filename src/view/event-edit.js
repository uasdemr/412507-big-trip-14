import { timeMakerDayJs } from '../utils/point.js';
import { EVENT_TYPES } from './const.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEventDestination = (point, destinations) => {
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

const createEditFormOffersItem = (allOffers, point, isDisabled) => {
  return allOffers.map((offer, index) => {
    const checked = point.offers.some((it) => it.title === offer.title);
    return `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" data-name="${offer.title}" id="event-offer-${point.type}-${index}" type="checkbox" ${checked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
         <label class="event__offer-label" for="event-offer-${point.type}-${index}">
           <span class="event__offer-title">${offer.title}</span>
           &plus;&euro;&nbsp;
           <span class="event__offer-price">${offer.price}</span>
         </label>
       </div>`;
  }).join('');
};

const createEditFormOffers = (point, offers, isDisabled) => {
  const allOffers = offers.find((it) => it.type === point.type).offers;
  const isLength = allOffers.length === 0 ? 'visually-hidden' : '';
  return `<section class="event__section  event__section--offers ${isLength}">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createEditFormOffersItem(allOffers, point, isDisabled)}
    </div>
    </section>`;
};

const createPointDestinationList = (destinations) => {
  return destinations.map((item) => {
    return `<option value="${item.name}">${item.name}</option>`;
  }).join('');
};

const createEventEditTemplate = (point, offers, destinations, isNew) => {
  const { isDisabled, isSaving, isDeleting } = point;
  const dates = timeMakerDayJs(point);
  const eventTypeItem = () => {
    return Object.entries(EVENT_TYPES).map(([key, val]) => {
      const checked = point.type === key;
      return `<div class="event__type-item">
        <input id="event-type-${key}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${key}" ${checked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
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
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination.name}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
            ${createPointDestinationList(destinations)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dates.editFormFormatedData.eventStartTimeDateTime}" ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dates.editFormFormatedData.eventEndTimeDateTime}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input event__input--price" id="event-price-1" type="number" min="1" name="event-price" value="${point.basePrice}" ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
          ${isSaving ? 'saving...' : 'save'}
        </button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
          ${isNew ? 'Cancel' : isDeleting ? 'deleting...' : 'delete'}
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createEditFormOffers(point, offers, isDisabled)}
        ${createEventDestination(point, destinations)}
      </section>
    </form>
  </li>`;
};

export default class EventEdit extends SmartView {
  constructor(point, offers, destinations, isNewPoint) {
    super();
    this._data = EventEdit.parsePointToData(point);
    this._element = null;
    this._datepickerFrom = null;
    this._datepickerTo = null;
    this._offers = offers;
    this._destinations = destinations;
    this._newPoint = isNewPoint;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._formBtnCloseClickHandler = this._formBtnCloseClickHandler.bind(this);

    this._offerClickHandler = this._offerClickHandler.bind(this);

    this._eventEditTypeChangeHandler = this._eventEditTypeChangeHandler.bind(this);
    this._eventEditDestinationChangeHandler = this._eventEditDestinationChangeHandler.bind(this);
    this._eventEditPriceChangeHandler = this._eventEditPriceChangeHandler.bind(this);

    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._setInnerHandlers();
    this._setDatepickerFrom();
    this._setDatepickerTo();
  }

  removeElement() {
    super.removeElement();
    if (this._datepickerFrom && this._datepickerTo) {
      this._datepickerFrom.destroy();
      this._datepickerTo.destroy();
      this._datepickerFrom = null;
      this._datepickerTo = null;
    }
  }

  reset(point) {
    this.updateData(
      EventEdit.parsePointToData(point));
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._offers, this._destinations, this._newPoint);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickerFrom();
    this._setDatepickerTo();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormClickHandler(this._callback.formCloseClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepickerFrom() {
    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }

    this._datepickerFrom = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        time_24hr: true,
        defaultDate: this._data.dataFrom,
        onChange: this._dateFromChangeHandler,
      });
  }
  _setDatepickerTo() {
    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }

    this._datepickerTo = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        time_24hr: true,
        minDate: this._data.dateFrom,
        defaultDate: this._data.dataTo,
        onChange: this._dateToChangeHandler,
      });
  }

  _dateFromChangeHandler([userDate]) {
    const dates = {
      dateFrom: userDate,
    };
    if (this._datepickerTo.selectedDates[0] < dates.dateFrom) {
      dates.dateTo = userDate;
    }
    this.updateData(dates);
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('.event__type-input').forEach((e) => e.addEventListener('change', this._eventEditTypeChangeHandler));
    this.getElement().querySelector('.event__input').addEventListener('change', this._eventEditDestinationChangeHandler);
    this.getElement().querySelectorAll('.event__offer-checkbox').forEach((e) => e.addEventListener('change', this._offerClickHandler));
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._eventEditPriceChangeHandler);
  }

  _eventEditTypeChangeHandler(evt) {
    this.updateData({
      type: evt.target.value,
    });
  }

  _eventEditDestinationChangeHandler(evt) {
    const destination = this._destinations.find((it) => it.name === evt.target.value);
    let msg = '';
    if (destination) {
      msg = '';
      this.updateData({
        destination: destination,
      });
    } else {
      msg = 'Введите город из списка.';
      evt.target.setCustomValidity(msg);
    }
  }

  _eventEditPriceChangeHandler(evt) {
    let msg = '';
    const priceValue = parseInt(evt.target.value, 10);
    if (priceValue <= 0 || !priceValue) {
      msg = 'Введите число больше нуля';
      evt.target.setCustomValidity(msg);
    } else {
      this.updateData({
        basePrice: priceValue,
      });
    }
  }

  _formSubmitHandler(evt) {
    const form = document.querySelector('.event--edit');
    if (form.checkValidity()) {
      evt.preventDefault();
      this._callback.formSubmit(EventEdit.parseDataToPoint(this._data));
    } else {
      return;
    }

  }

  _formBtnCloseClickHandler(evt) {
    evt.preventDefault();
    this._callback.formCloseClick(evt);
  }

  _offerClickHandler(evt) {
    const isChecked = evt.target.checked;
    const offer = evt.target.dataset.name;
    let currentOffers = this._data.offers;
    if (isChecked) {
      const allOffers = this._offers.find((it) => it.type === this._data.type).offers;
      const checkedOffer = allOffers.find((it) => it.title === offer);
      currentOffers.push(checkedOffer);
    } else {
      currentOffers = currentOffers.filter((it) => it.title !== offer);
    }
    this.updateData({
      offers: currentOffers,
    });
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setFormClickHandler(callback) {
    this._callback.formCloseClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formBtnCloseClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
  }

  static parseDataToPoint(data) {
    data = Object.assign(
      {},
      data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
