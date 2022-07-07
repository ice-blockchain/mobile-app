// SPDX-License-Identifier: BUSL-1.1

import {Linking} from 'react-native';
import {isIOS} from 'rn-units';

export const openSMS = async (phoneNumber: string, message: string) => {
  try {
    const separator = isIOS ? '&' : '?';
    const url = `sms:${phoneNumber}${separator}body=${message}`;
    await Linking.openURL(url);
  } catch (error) {}
};
