import {PropsWithChildren, ReactNode} from 'react';
import {
  NotificationType,
  NotificationsReducerActionsType,
} from '../reducers/notificationsReducer/types';

export type NotificationsContextTypeDigest = {
  children: ReactNode;
};

export type NotificationsContextTypeDigested = PropsWithChildren<{
  notifications: {
    state: NotificationType[];
    dispatch: React.Dispatch<NotificationsReducerActionsType>;
  };
}>;
