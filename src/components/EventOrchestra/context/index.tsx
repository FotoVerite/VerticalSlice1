import React, {FC, useCallback, useReducer, useState} from 'react';
import {
  EventOrchestraContextTypeDigest,
  EventOrchestraContextTypeDigested,
  EventOrchestraObjectType,
  MessageAppContactsEventType,
} from './types';
import {APP_NAMES} from 'components/apps/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';
import eventsReducer from '../reducers';
import {EventsReducerActionsType} from '../reducers/types';

//defaults for empty app
export const EventOrchestraContext =
  React.createContext<EventOrchestraContextTypeDigested>({});

const EventOrchestraContextProvider: FC<
  EventOrchestraContextTypeDigest
> = props => {
  const setDefaultMessageEventState = (state: MessageAppContactsEventType) => {
    for (const name of Object.values(CONTACT_NAMES)) {
      if (state[name] === undefined) {
        state[name] = {views: [], routes: {}};
      }
    }
    return state;
  };

  const [events, dispatch] = useReducer(eventsReducer, {
    [APP_NAMES.MESSAGE]: setDefaultMessageEventState({}),
  });

  const memoizedDispatch = useCallback((action: EventsReducerActionsType) => {
    dispatch(action);
  }, []);

  return (
    <EventOrchestraContext.Provider
      value={{
        events: {state: events, dispatch: memoizedDispatch},
      }}>
      {props.children}
    </EventOrchestraContext.Provider>
  );
};

export default EventOrchestraContextProvider;
export const EventOrchestraContextConsumer = EventOrchestraContext.Consumer;
