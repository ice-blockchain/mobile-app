// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

type Props =
  | {
      title: string;
      showViewAll: false;
    }
  | {
      title: string;
      showViewAll: true;
      onViewAllPress: () => void;
    };

export const SectionHeader = memo((props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{props.title}</Text>
      {props.showViewAll && (
        <TouchableOpacity
          hitSlop={viewAllHitSlop}
          onPress={props.onViewAllPress}>
          <Text style={styles.viewAllText}>{t('button.view_all')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    justifyContent: 'space-between',
    marginTop: rem(28),
  },
  titleText: {
    fontFamily: FONTS.primary.black,
    fontSize: font(14),
    lineHeight: font(17),
    color: COLORS.darkBlue,
  },
  viewAllText: {
    fontFamily: FONTS.primary.regular,
    fontSize: font(12),
    lineHeight: font(15),
    color: COLORS.darkBlue,
  },
});

const viewAllHitSlop = {top: 10, right: 15, bottom: 10, left: 15};
