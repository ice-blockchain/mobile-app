// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {LogoIconSvg} from '@svg/LogoIcon';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {font} from 'rn-units';

const IceFriendsHeader = () => {
  return (
    <View style={styles.friendsHeader}>
      <LogoIconSvg />
      <Text style={styles.ice}> ice </Text>
      <Text style={styles.title}>friends</Text>
    </View>
  );
};

export const SectionHeader = ({section}: {section: {title: string}}) => {
  return (
    <View style={styles.titleContainer}>
      {section.title === 'All contacts' ? (
        <Text style={styles.title}>{section.title}</Text>
      ) : (
        <IceFriendsHeader />
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
