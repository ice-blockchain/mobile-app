// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SCREEN_SIDE_OFFSET, SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {CloseIconSvg} from '@svg/CloseIcon';
import {StakeIcon} from '@svg/StakeIcon';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem} from 'rn-units';

export const MiningTooltip = ({}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCell}>
          <Text style={styles.headerLabelText}>TIME LEFT</Text>
          <Text style={styles.headerValueText}>21h14m3s</Text>
        </View>
        <View style={styles.headerSeparator} />
        <View style={[styles.headerCell, styles.headerCell_right]}>
          <Text style={styles.headerLabelText}>MINING RATE</Text>
          <Text style={styles.headerValueText}>+29.99 ice/hr</Text>
        </View>
      </View>
      <Text style={styles.titleText}>Boost your mining rate</Text>
      <Text style={styles.noteText}>
        Stake your mining rewards for up to 5 years and increase your mining
        rate by up to 500%.
      </Text>
      <PrimaryButton
        onPress={() => {}}
        text={'Stake Now!'}
        style={styles.button}
        icon={<StakeIcon />}
      />
      <TouchableOpacity
        hitSlop={SMALL_BUTTON_HIT_SLOP}
        style={styles.closeButton}
        onPress={navigation.goBack}>
        <CloseIconSvg fill={COLORS.darkBlue} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.darkBlue,
    borderRadius: rem(20),
    paddingVertical: rem(24),
    paddingHorizontal: rem(25),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
  },
  headerCell_right: {
    alignItems: 'flex-end',
  },
  headerSeparator: {
    width: 1,
    backgroundColor: COLORS.white,
    height: rem(22),
  },
  headerLabelText: {
    fontSize: font(10),
    lineHeight: font(12),
    color: COLORS.white,
    fontFamily: FONTS.primary.regular,
  },
  headerValueText: {
    marginTop: rem(2),
    fontSize: font(15),
    lineHeight: font(18),
    color: COLORS.shamrock,
    fontFamily: FONTS.primary.bold,
  },
  titleText: {
    fontSize: font(18),
    lineHeight: font(22),
    color: COLORS.white,
    fontFamily: FONTS.primary.black,
    textAlign: 'center',
    marginTop: rem(26),
  },
  noteText: {
    fontSize: font(12),
    lineHeight: font(17),
    color: COLORS.white,
    fontFamily: FONTS.primary.regular,
    textAlign: 'center',
    marginTop: rem(6),
  },
  button: {
    marginTop: rem(26),
    backgroundColor: COLORS.shamrock,
    height: rem(41),
    alignSelf: 'center',
    paddingLeft: rem(14),
  },
  closeButton: {
    position: 'absolute',
    top: -rem(5),
    right: -rem(5),
    width: rem(22),
    height: rem(22),
    borderRadius: rem(11),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
