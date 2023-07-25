export enum NOTIFICATIONS_REDUCER_ACTIONS {
  ADD,
  DELETE,
  RESET,
  UPDATE,
}

import {ImageSourcePropType} from 'react-native';

export type NotificationDataType = {
  active: boolean;
  title: string;
  content: string;
  timestamp: Date;
  image?: ImageSourcePropType;
};

export type NotificationType = NotificationDataType & {
  index: number;
};

export type AddNotificationActionPayloadType = {
  type: NOTIFICATIONS_REDUCER_ACTIONS.ADD;
  payload: {data: NotificationDataType};
};

export type UpdateNotificationActionPayloadType = {
  type: NOTIFICATIONS_REDUCER_ACTIONS.UPDATE;
  payload: {data: NotificationDataType; index: number};
};

export type DeleteNotificationActionPayloadType = {
  type: NOTIFICATIONS_REDUCER_ACTIONS.DELETE;
  payload: {index: number};
};

export type ResetNotificationActionPayloadType = {
  type: NOTIFICATIONS_REDUCER_ACTIONS.RESET;
};

export type NotificationsReducerActionsType =
  | AddNotificationActionPayloadType
  | UpdateNotificationActionPayloadType
  | DeleteNotificationActionPayloadType
  | ResetNotificationActionPayloadType;
