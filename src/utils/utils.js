import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const timeMakerDayJs = (point) => {
  const dayjs1 = dayjs(point.dateFrom);
  const dayjs2 = dayjs(point.dateTo);
  const diff = dayjs2.diff(dayjs1);
  const diffDate = dayjs(diff);

  const eventStartTimeDateTime = dayjs1.format('YYYY-MM-DDTHH:mm');
  const eventEndTimeDateTime = dayjs2.format('YYYY-MM-DDTHH:mm');
  const eventDateDateTime = dayjs1.format('YYYY-MM-DD');
  const startDate = dayjs1.format('MMM DD');
  const dateFromReturned = dayjs1.format('HH:mm');
  const dateToReturned = dayjs2.format('HH:mm');
  const diffReturned = diffDate.format('DD[D] HH[H] mm[M]');

  const editFormFormatedData = {
    eventStartTimeDateTime: dayjs1.format('DD/MM/YY HH:mm'),
    eventEndTimeDateTime: dayjs2.format('DD/MM/YY HH:mm'),
  };

  const dates = {
    eventStartTime: dateFromReturned,
    eventEndTime: dateToReturned,
    eventDuration: diffReturned,
    eventDate: startDate,
    eventDateDateTime,
    eventStartTimeDateTime,
    eventEndTimeDateTime,
    editFormFormatedData,
  };
  return dates;
};

const isFeature = (dateFrom) => {
  return new Date(dateFrom) >= Date.now();
};
const isPast = (dateTo) => {
  return new Date(dateTo) < Date.now();
};

export {
  timeMakerDayJs,
  isFeature,
  isPast,
  getRandomInteger,
  RenderPosition,
  render,
  createElement
};
