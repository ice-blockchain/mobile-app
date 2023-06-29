// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {ContactsIcon} from '@svg/ContactsIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {isRTL, t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export type SegmentData = {
  renderText: (active: boolean) => React.ReactNode;
  key: 'Contacts' | 'TierOne' | 'TierTwo';
};

export const SEGMENTS: Readonly<SegmentData[]> = [
  {
    renderText: (active: boolean) => {
      return (
        <View style={styles.row}>
          <View style={styles.contactsIcon}>
            <ContactsIcon
              width={rem(20)}
              height={rem(20)}
              color={active ? COLORS.white : COLORS.secondary}
            />
          </View>
          <Text
            style={[
              styles.text,
              {color: active ? COLORS.white : COLORS.secondary},
            ]}>
            {t('team.contacts_tab')}
          </Text>
        </View>
      );
    },
    key: 'Contacts',
  },
  {
    renderText: function (active: boolean) {
      return (
        <View style={styles.row}>
          <View style={styles.tierIcon}>
            <TierOneIcon
              width={rem(24)}
              height={rem(24)}
              color={active ? COLORS.white : COLORS.secondary}
            />
          </View>
          <Text
            style={[
              styles.text,
              {color: active ? COLORS.white : COLORS.secondary},
            ]}>
            {t('users.referralType.T1')}
          </Text>
        </View>
      );
    },
    key: 'TierOne',
  },
  {
    renderText: function (active: boolean) {
      return (
        <View style={styles.row}>
          <View style={styles.tierTwoIcon}>
            <TierTwoIcon
              width={rem(24)}
              height={rem(24)}
              color={active ? COLORS.white : COLORS.secondary}
            />
          </View>
          <Text
            style={[
              styles.text,
              {color: active ? COLORS.white : COLORS.secondary},
            ]}>
            {t('users.referralType.T2')}
          </Text>
        </View>
      );
    },
    key: 'TierTwo',
  },
];

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // isRTL ? 14 : 17 - for the Arabic language, because of the words outside of the button
    ...font(isRTL ? 14 : 17, isRTL ? 19 : 22, 'semibold', 'secondary'),
    marginLeft: rem(4),
  },
  contactsIcon: {marginLeft: rem(-1)},
  tierIcon: {marginRight: rem(-5)},
  tierTwoIcon: {marginRight: rem(-4)},
});
