import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const timeMakerDayJs = (point) => {
  const dayjs1 = dayjs(point.date_from);
  const dayjs2 = dayjs(point.date_to);
  const diff = dayjs2.diff(dayjs1);
  const diffDate = dayjs(diff);

  const eventStartTimeDateTime = dayjs1.format('YYYY-MM-DDTHH:mm');
  const eventEndTimeDateTime = dayjs2.format('YYYY-MM-DDTHH:mm');
  const eventDateDateTime = dayjs1.format('YYYY-MM-DD');
  const startDate = dayjs1.format('MMM DD');
  const dateFromReturned = dayjs1.format('HH:mm');
  const dateToReturned = dayjs2.format('HH:mm');
  const diffReturned = diffDate.format('DD[D] HH[H] mm[M]');
  const objReturned = {
    eventStartTime: dateFromReturned,
    eventEndTime: dateToReturned,
    eventDuration: diffReturned,
    eventDate: startDate,
    eventDateDateTime,
    eventStartTimeDateTime,
    eventEndTimeDateTime,
  };
  return objReturned;
};

export {timeMakerDayJs};
