// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {MultipleNumbersIcon} from '@screens/Team/components/Contacts/components/ContactsList/assets/svg/MultipleNumbersIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const MultipleNumbers = () => {
  return (
    <View style={styles.container}>
      <MultipleNumbersIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: rem(22),
    height: rem(22),
    borderRadius: rem(11),
    borderWidth: 1,
    borderColor: COLORS.white,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
