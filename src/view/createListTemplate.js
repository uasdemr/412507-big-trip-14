import {createOfferItem} from './createOfferItem.js';
import {timeMakerDayJs} from '../mock/utils';

const createListTemplate = (point) => {
  console.log(point);
  const eventFavoriteBtnClassName  = point.is_favorite ? 'event__favorite-btn--active' : '';
  const dateArr = timeMakerDayJs(point);
  console.log(dateArr);
  const event = `${point.type} ${point.destination.name}`;

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateArr.eventDateDateTime}">${dateArr.eventDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${event}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateArr.eventStartTimeDateTime}">${dateArr.eventStartTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateArr.eventEndTimeDateTime}">${dateArr.eventEndTime}</time>
        </p>
        <p class="event__duration">${dateArr.eventDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.base_price}</span>
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

export {createListTemplate};
