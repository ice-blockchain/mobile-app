// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {dayjs} from '@services/dayjs';
import {logError} from '@services/logging';
import {checkProp} from '@utils/guards';
import * as Haptics from 'expo-haptics';
import {ImpactFeedbackStyle} from 'expo-haptics/src/Haptics.types';
import {Linking} from 'react-native';
import {
  InAppBrowser,
  InAppBrowserOptions,
} from 'react-native-inappbrowser-reborn';
import {wait} from 'rn-units';

export function hapticFeedback(
  type: ImpactFeedbackStyle = ImpactFeedbackStyle.Light,
) {
  Haptics.impactAsync(type);
}

export const openLink = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
      return true;
    }
    return false;
  } catch (error) {
    if (!isOpayBrowserError(error)) {
      logError(error);
    }
    return false;
  }
};

/**
 * Some devices have their own custom Android-based Operating Systems.
 * Such as TECNO's HiOS and Infinix's XOS.
 * These systems include a custom browser - com.opay.webview.WebFoundationActivity.
 * This browser is a default handler for http/https schemes.
 * However they also made the activity of this browser "not exported",
 * so any attempt to start an intent with one of these schemes results
 * in a "Permission Denial" error.
 */
const isOpayBrowserError = (error: unknown) => {
  return (
    checkProp(error, 'message') &&
    typeof error.message === 'string' &&
    error.message.includes('com.opay.webview.WebFoundationActivity')
  );
};

export const openLinkWithInAppBrowser = async ({
  url,
  options,
}: {
  url: string;
  options?: InAppBrowserOptions;
}) => {
  const config: InAppBrowserOptions = {
    // iOS Properties
    dismissButtonStyle: 'cancel',
    preferredBarTintColor: COLORS.primary,
    preferredControlTintColor: COLORS.white,
    readerMode: false,
    animated: true,
    modalPresentationStyle: 'fullScreen',
    modalTransitionStyle: 'coverVertical',
    modalEnabled: true,
    enableBarCollapsing: false,
    // Android Properties
    showTitle: true,
    toolbarColor: COLORS.primary,
    secondaryToolbarColor: COLORS.black,
    navigationBarColor: COLORS.black,
    navigationBarDividerColor: COLORS.white,
    enableUrlBarHiding: true,
    enableDefaultShare: true,
    forceCloseOnRedirection: false,
    ...options,
  };

  try {
    const result = await InAppBrowser.open(url, config);

    return result;
  } catch (error) {
    // Sometimes browser stays open, you just need to close it manually
    InAppBrowser.close();
    await wait(300);

    return InAppBrowser.open(url, config);
  }
};

export const getTimezoneOffset = () => {
  const timezoneOffset = new Date().getTimezoneOffset();

  /**
   * The number of minutes returned by getTimezoneOffset()
   * is positive if the local time zone is behind UTC,
   * and negative if the local time zone is ahead of UTC.
   * For example, for UTC+10, -600 will be returned.
   */
  const sign = timezoneOffset > 0 ? '-' : '+';

  const formattedOffset = dayjs
    .duration(Math.abs(timezoneOffset), 'm')
    .format('HH:mm');

  return `${sign}${formattedOffset}`;
};
