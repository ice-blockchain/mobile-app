// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@screens/Team/components/Header';
import {Tiers} from '@screens/Team/components/Tiers';
import React from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {isIOS} from 'rn-units';

export const Team = () => {
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={isIOS ? 'padding' : 'height'}>
      <View style={styles.container}>
        <Header />
        <View style={commonStyles.baseSubScreen}>
          <Tiers />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.persianBlue,
    flex: 1,
  },
  subContainer: {
    backgroundColor: COLORS.white,
  },
});
