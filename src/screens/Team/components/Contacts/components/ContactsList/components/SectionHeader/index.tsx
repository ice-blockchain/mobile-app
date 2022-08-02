// SPDX-License-Identifier: BUSL-1.1

import {stopPropagination} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {ContactSection} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContactSegments';
import {LogoIconSvg} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font, rem} from 'rn-units';

const IceFriendsHeader = () => {
  return (
    <View style={styles.friendsHeader}>
      <LogoIconSvg />
      <Text style={styles.ice}>{t('team.contacts_list.ice_header.ice')}</Text>
      <Text style={styles.title}>
        {t('team.contacts_list.ice_header.friends')}
      </Text>
    </View>
  );
};

export const SectionHeader = ({section}: {section: ContactSection}) => {
  return (
    <View {...stopPropagination}>
      <View style={styles.titleContainer}>
        {section.id === 'friends' ? (
          <IceFriendsHeader />
        ) : (
          <Text style={styles.title}>{section.title}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: rem(26),
    backgroundColor: COLORS.white,
    marginBottom: rem(18),
    paddingBottom: rem(6),
  },
  title: {
    color: COLORS.darkBlue,
    fontSize: font(14),
    fontFamily: FONTS.primary.semibold,
  },
  friendsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -rem(14),
  },
  ice: {
    fontFamily: FONTS.primary.heavy,
    color: COLORS.darkBlue,
    fontSize: font(14),
  },
});
