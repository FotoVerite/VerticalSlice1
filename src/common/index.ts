import moment, {Moment} from 'moment';

export const delayFor = (delay: number) => {
  return new Promise(res => setTimeout(res, delay));
};

export const formatMoment = (date: Moment): string => {
  const now = moment();
  if (now.diff(date, 'day') === 0) {
    return date.format('h:mm a');
  } else if (now.diff(date, 'week') === 0) {
    return date.format('dddd');
  } else {
    return date.format('MM/DD/YYYY');
  }
};
