// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {TeamSectionSegmentHeader} from '@screens/Team/components/SegmentedContent/components/TeamSectionSegmentHeader';
import {ContactsIcon} from '@svg/ContactsIcon';
import {TierOneIcon} from '@svg/TierOneIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export type SegmentData = {
  renderText: (active: boolean) => React.ReactNode;
  key: 'Contacts' | 'TierOne' | 'TierTwo' | 'Logs';
};

export const SEGMENTS: Readonly<SegmentData[]> = [
  {
    renderText: (active: boolean) => (
      <TeamSectionSegmentHeader
        headerText={t('team.contacts_tab')}
        active={active}
        icon={
          <View style={styles.contactsIcon}>
            <ContactsIcon
              width={rem(20)}
              height={rem(20)}
              color={active ? COLORS.white : COLORS.secondary}
            />
          </View>
        }
      />
    ),
    key: 'Contacts',
  },
  {
    renderText: (active: boolean) => {
      return (
        <TeamSectionSegmentHeader
          headerText={t('users.referralType.T1')}
          active={active}
          icon={
            <View style={styles.tierIcon}>
              <TierOneIcon
                width={rem(24)}
                height={rem(24)}
                color={active ? COLORS.white : COLORS.secondary}
              />
            </View>
          }
        />
      );
    },
    key: 'TierOne',
  },
  {
    renderText: function (active: boolean) {
      return (
        <TeamSectionSegmentHeader
          headerText={t('users.referralType.T2')}
          active={active}
          icon={
            <View style={styles.tierTwoIcon}>
              <TierTwoIcon
                width={rem(24)}
                height={rem(24)}
                color={active ? COLORS.white : COLORS.secondary}
              />
            </View>
          }
        />
      );
    },
    key: 'TierTwo',
  },
  {
    renderText: function (active: boolean) {
      return (
        <TeamSectionSegmentHeader
          headerText={'LOGS'}
          active={active}
          icon={
            <View style={styles.tierTwoIcon}>
              <TierTwoIcon
                width={rem(24)}
                height={rem(24)}
                color={active ? COLORS.white : COLORS.secondary}
              />
            </View>
          }
        />
      );
    },
    key: 'Logs',
  },
];

const styles = StyleSheet.create({
  contactsIcon: {marginLeft: rem(-1)},
  tierIcon: {marginRight: rem(-5)},
  tierTwoIcon: {marginRight: rem(-4)},
});
