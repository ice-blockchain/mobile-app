// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@screens/Team/components/Header';
import {Tiers} from '@screens/Team/components/Tiers';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Team = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={commonStyles.baseSubScreen}>
        <Tiers />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.persianBlue,
    flex: 1,
  },
  subContainer: {
    backgroundColor: COLORS.white,
  },
});
