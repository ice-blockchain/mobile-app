// SPDX-License-Identifier: ice License 1.0

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
  trackUserName: (username: string) => {
    ReactMoE.setUserName(username);
  },
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

export function stopTrackingCurrentUser() {
  ReactMoE.logout();
}
