// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {
  STAKING_RATE_PERCENTAGES_MAX,
  STAKING_YEARS_MAX,
} from '@constants/staking';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {isRTL, t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {isAndroid, rem} from 'rn-units';

export const Intro = memo(() => {
  return (
    <Text style={styles.noteText} numberOfLines={3} adjustsFontSizeToFit>
      {t('staking.benefits_description', {
        periodYears: STAKING_YEARS_MAX,
        ratePercentages: STAKING_RATE_PERCENTAGES_MAX,
      })}{' '}
      <Touchable hitSlop={SMALL_BUTTON_HIT_SLOP} onPress={onLinkPress}>
        <InfoOutlineIcon
          color={COLORS.shamrock}
          width={rem(16)}
          height={rem(16)}
        />
      </Touchable>
    </Text>
  );
});

const onLinkPress = () => {
  openLinkWithInAppBrowser({url: LINKS.PRE_STAKING});
};

const styles = StyleSheet.create({
  noteText: {
    marginHorizontal: rem(28),
    marginTop: rem(24),
    ...font(14, 20, 'regular', 'white', isRTL && isAndroid ? 'left' : 'center'), // info icon doesn't align center on Android
  },
});
