// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {LogoIconSvg} from '@svg/LogoIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font} from 'rn-units';

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

export const SectionHeader = ({
  section,
}: {
  section: {title: string; data: string[]};
}) => {
  const [iceFriendsContent] = section.data;
  return (
    <View style={styles.titleContainer}>
      {iceFriendsContent === 'InviteFriendsButton' ? null : section.title ===
        'iceFriends' ? (
        <IceFriendsHeader />
      ) : (
        <Text style={styles.title}>{section.title}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: COLORS.white,
    marginBottom: 24,
  },
  title: {
    color: COLORS.darkBlue,
    fontSize: font(14),
    fontFamily: FONTS.primary.semibold,
  },
  friendsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ice: {
    fontFamily: FONTS.primary.heavy,
    color: COLORS.darkBlue,
    fontSize: font(14),
  },
});
