import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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

export const timeMakerDayJs = (point) => {
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

  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateTo));
};

export const sortPriceDown = (pointA, pointB) => {
  return pointA.basePrice - pointB.basePrice;
};
