/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';

import Notification from './Notification';

const Bitch: FC = () => {
  return (
    <>
      <Notification
        delay={0}
        speed={1000}
        text={"You're a Bitch"}
        containerStyle={{zIndex: 11}}
      />
      <Notification
        delay={1000}
        speed={500}
        text={'Monster'}
        containerStyle={{zIndex: 12, top: 75}}
      />
      <Notification
        delay={1800}
        speed={250}
        text={'Fucking Die!'}
        containerStyle={{zIndex: 13, top: 90}}
      />
      <Notification
        delay={2500}
        speed={100}
        text={'Just Kill yourself!'}
        containerStyle={{zIndex: 14, top: 110}}
      />
    </>
  );
};

export default Bitch;
