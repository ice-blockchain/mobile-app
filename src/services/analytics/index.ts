// SPDX-License-Identifier: ice License 1.0

import {BadgeSummary} from '@api/achievements/types';
import analytics from '@react-native-firebase/analytics';
import {EventNamesType} from '@store/modules/Analytics/types';
import ReactMoE, {MoEProperties} from 'react-native-moengage';

type TrackEventParams = {
  eventName: EventNamesType;
  eventProps?: {[key: string]: string};
};

export function startTrackingCurrentUser(userID: string) {
  ReactMoE.setUserUniqueID(userID);
}

export const Attributes = {
  trackUserFirstName: (firstName: string) => {
    ReactMoE.setUserFirstName(firstName);
  },
  trackUserLastName: (lastName: string) => {
    ReactMoE.setUserLastName(lastName);
  },
  trackUserEmail: (email: string) => {
    ReactMoE.setUserEmailID(email);
  },
  trackUserContactNumber: (phoneNumber: string) => {
    ReactMoE.setUserContactNumber(phoneNumber);
  },
  trackUserAttribute: (name: string, value: string | number) => {
    ReactMoE.setUserAttribute(name, value);
  },
  trackUserAttributeISODateString: (name: string, value: string) => {
    ReactMoE.setUserAttributeISODateString(name, value);
  },
  trackBadgeAttribute: ({badgeSummary}: {badgeSummary: BadgeSummary}) => {
    const badgeTypeToAttributeName = () => {
      switch (badgeSummary.type) {
        case 'level':
          return 'Current Level Badge';
        case 'coin':
          return 'Current Coins Badge';
        case 'social':
          return 'Current Social Badge';
      }
      return null;
    };
    const name = badgeTypeToAttributeName();
    if (name) {
      ReactMoE.setUserAttribute(name, badgeSummary.name);
    }
  },
};

export function trackEvent({eventName, eventProps}: TrackEventParams) {
  const properties = new MoEProperties();
  if (eventProps) {
    Object.keys(eventProps).forEach((key: string) => {
      properties.addAttribute(key, (eventProps[key] ?? '').toString());
    });
  }
  ReactMoE.trackEvent(eventName, properties);
}

export function trackScreenView({screenName}: {screenName: string}) {
  trackEvent({
    eventName: 'View Screen',
    eventProps: {'Screen Name': screenName},
  });
  analytics().logScreenView({screen_name: screenName});
}

export function stopTrackingCurrentUser() {
  ReactMoE.logout();
}
