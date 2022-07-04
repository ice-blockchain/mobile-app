// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Header} from '@screens/Team/components/Header';
import {Tiers} from '@screens/Team/components/Tiers';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {isIOS} from 'rn-units';

export const Team = () => {
  useFocusStatusBar({style: 'light-content'});
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={isIOS ? 'padding' : undefined}>
        <View style={styles.container}>
          <Header />
          <View style={commonStyles.baseSubScreen}>
            <Tiers />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
});
