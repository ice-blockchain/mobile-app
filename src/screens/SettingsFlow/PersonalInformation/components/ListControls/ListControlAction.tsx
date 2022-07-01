// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {ListControlBase} from '@screens/SettingsFlow/PersonalInformation/components/ListControls/ListControlBase';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {font, rem} from 'rn-units';

type Props = {
  label: string;
  value: string;
  action: string;
  onPress: () => void;
};

export const ListControlAction = memo(
  ({label, value, action, onPress}: Props) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <ListControlBase label={label}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.actionText}>{action}</Text>
        </ListControlBase>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  valueText: {
    color: COLORS.greyText,
    fontFamily: FONTS.primary.bold,
    fontSize: font(14),
    flex: 1,
  },
  actionText: {
    color: COLORS.darkBlue,
    fontFamily: FONTS.primary.black,
    fontSize: font(10),
    marginHorizontal: rem(12),
  },
});
