import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const createEmptyPoint = () => {
  return {
    'basePrice': 0,
    'dateFrom': dayjs(Date.now()).toISOString(),
    'dateTo': null,
    'destination': {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      name: 'Ростов-на-дону',
      pictures: [
        {
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.',
          src: 'http://picsum.photos/248/152?r=8899',
        },
        {
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.',
          src: 'http://picsum.photos/248/152?r=6649',
        },
      ],
    },
    'id': 0,
    'isFavorite': 0,
    'offers': [],
    'type': 'taxi',
  };
};

export const isFeature = (dateFrom) => {
  return new Date(dateFrom) >= Date.now();
};

export const isPast = (dateTo) => {
  return new Date(dateTo) < Date.now();
};

export const zeroPad = (num) => {
  return String(num).padStart(2, 0);
};

export const formatToDayHourMinutes = (val) => {
  const days = zeroPad(dayjs.duration(val, 'minutes').days());
  const hours = zeroPad(dayjs.duration(val, 'minutes').hours());
  const minutes = zeroPad(dayjs.duration(val, 'minutes').minutes());
  return `${days}D ${hours}H ${minutes}M`;
};

export const timeMakerDayJs = (point) => {
  const dayjs1 = dayjs(point.dateFrom);
  const dayjs2 = dayjs(point.dateTo);
  const diffInMinutes = dayjs2.diff(dayjs1, 'minute');

  // const days = zeroPad(dayjs.duration(diffInMinutes, 'minutes').days());
  // const hours = zeroPad(dayjs.duration(diffInMinutes, 'minutes').hours());
  // const minutes = zeroPad(dayjs.duration(diffInMinutes, 'minutes').minutes());
  const diffReturned = formatToDayHourMinutes(diffInMinutes);

  const eventStartTimeDateTime = dayjs1.format('YYYY-MM-DDTHH:mm');
  const eventEndTimeDateTime = dayjs2.format('YYYY-MM-DDTHH:mm');
  const eventDateDateTime = dayjs1.format('YYYY-MM-DD');
  const startDate = dayjs1.format('MMM DD');
  const dateFromReturned = dayjs1.format('HH:mm');
  const dateToReturned = dayjs2.format('HH:mm');
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

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTimeDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateTo);

  if (weight !== null) {
    return weight;
  }
  const pointAdiff = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'second');
  const pointBdiff = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'second');
  return pointBdiff - pointAdiff;

};

export const sortPriceDown = (pointA, pointB) => {
  return pointB.basePrice - pointA.basePrice;
};

export const sortDefault = (pointA, pointB) => {
  return dayjs(pointA.dateFrom).isAfter(dayjs(pointB.dateTo));
};

export const isDateChange = (oldPoint, changedPoint) => {
  return !(dayjs(oldPoint.dateFrom).isSame(changedPoint.dateFrom) && dayjs(oldPoint.dateTo).isSame(changedPoint.dateTo));
};

export const isPriceChange = (oldPoint, changedPoint) => {
  return parseInt(oldPoint.basePrice, 10) !== parseInt(changedPoint.basePrice, 10);
};

