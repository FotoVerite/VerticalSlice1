export enum NOTIFICATIONS_REDUCER_ACTIONS {
  ADD,
  DELETE,
  RESET,
  UPDATE,
}

import {ImageSourcePropType} from 'react-native';

export type NotificationDataType = {
  active: boolean;
  backgroundColor?: string;
  title: string;
  content: string;
  timestamp: Date;
  image?: ImageSourcePropType;
  onPress?: () => void;
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
  payload:
    | {[index in keyof NotificationType]?: NotificationType[index]} & {
        index: number;
      };
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
