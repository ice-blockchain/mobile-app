// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {isLiteTeam} from '@constants/featureFlags';
import {TeamSectionSegmentHeader} from '@screens/Team/components/SegmentedContent/components/TeamSectionSegmentHeader';
import {ContactsIcon} from '@svg/ContactsIcon';
import {TierTwoIcon} from '@svg/TierTwoIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export type SegmentData = {
  renderText: (active: boolean) => React.ReactNode;
  key: 'Contacts' | 'Team';
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
          headerText={isLiteTeam ? t('override.users.team') : t('users.team')}
          active={active}
          icon={
            <View style={styles.teamIcon}>
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
    key: 'Team',
  },
];

const styles = StyleSheet.create({
  contactsIcon: {marginLeft: rem(-1)},
  teamIcon: {marginRight: rem(-4)},
});
