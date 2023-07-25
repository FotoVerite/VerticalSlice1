import React, {FC, useState} from 'react';
import {
  EventOrchestraContextTypeDigest,
  EventOrchestraContextTypeDigested,
  EventOrchestraObjectType,
  MessageAppContactsEventType,
} from './types';
import {APP_NAMES} from 'components/apps/types';
import {CONTACT_NAMES} from 'components/apps/Messages/context/usersMapping';

//defaults for empty app
export const EventOrchestraContext =
  React.createContext<EventOrchestraContextTypeDigested>({});

const EventOrchestraContextProvider: FC<
  EventOrchestraContextTypeDigest
> = props => {
  const setDefaultMessageEventState = (state: MessageAppContactsEventType) => {
    for (const name of Object.values(CONTACT_NAMES)) {
      if (state[name] == undefined) {
        state[name] = {views: [], routes: {}};
      }
    }
    return state;
  };

  const [events, setEvent] = useState<EventOrchestraObjectType>({
    [APP_NAMES.MESSAGE]: setDefaultMessageEventState({}),
  });

  return (
    <EventOrchestraContext.Provider
      value={{
        events: {state: events, set: setEvent},
      }}>
      {props.children}
    </EventOrchestraContext.Provider>
  );
};

export default EventOrchestraContextProvider;
export const EventOrchestraContextConsumer = EventOrchestraContext.Consumer;
