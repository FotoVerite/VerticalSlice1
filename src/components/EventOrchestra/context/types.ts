import {PropsWithChildren, ReactNode} from 'react';
import {
  EventOrchestraObjectType,
  EventsReducerActionsType,
} from '../reducers/types';

export type EventOrchestraContextTypeDigest = {
  children: ReactNode;
};

export type EventOrchestraContextTypeDigested = PropsWithChildren<{
  events: {
    state: EventOrchestraObjectType;
    dispatch: (action: EventsReducerActionsType) => void;
  };
}>;
