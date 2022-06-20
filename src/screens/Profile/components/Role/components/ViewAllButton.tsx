// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {InfoIconHollow} from '@svg/InfoIconHollow';
import {t} from '@utils/i18n';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {font, rem} from 'rn-units';

export const ViewAllButton = () => {
  return (
    <TouchableOpacity style={styles.viewAll} hitSlop={hitSlop}>
      <Text style={styles.viewAllText}>{t('profile.view_all_roles')}</Text>
      <InfoIconHollow style={styles.infoIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewAll: {
    marginTop: rem(12),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  viewAllText: {
    fontSize: font(12),
    color: COLORS.darkBlue,
    textAlign: 'center',
  },
  infoIcon: {
    marginLeft: rem(4),
  },
});

const hitSlop = {top: 10, right: 10, bottom: 10, left: 10};
