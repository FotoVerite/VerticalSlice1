import moment, {Moment} from 'moment';
import {ConversationExchangeType} from '../../../context/types';
import {DigestedConversationTimeType, MESSAGE_TYPE} from './types';

const HEIGHT = 30;

export const createTimeItem = (
  item: ConversationExchangeType,
  width: number,
  positionAcc: number,
): DigestedConversationTimeType => {
  const listItem = {
    height: HEIGHT,
    width: width,
    paddingBottom: 0,
    offset: positionAcc,
    content: formatMoment(moment(item.time)),
    type: MESSAGE_TYPE.TIME,
  } as DigestedConversationTimeType;
  return listItem;
};

export const formatMoment = (date: Moment): string => {
  const now = moment();
  if (now.diff(date, 'day') === 0) {
    return date.format('h:mm a');
  } else if (now.diff(date, 'week') === 0) {
    return date.format('dddd hh:mm a');
  } else {
    return date.format('ddd, MMMM DD, YYYY hh:mm a');
  }
};
