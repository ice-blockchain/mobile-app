// SPDX-License-Identifier: BUSL-1.1

import {KeyboardDismiss} from '@components/KeyboardDismiss';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Header} from '@screens/Team/components/Header';
import {Tiers} from '@screens/Team/components/Tiers';
import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {isIOS} from 'rn-units';

export const Team = () => {
  useFocusStatusBar({style: 'light-content'});
  const [isCountryCodeSearchVisible, setCountryCodeSearchVisibility] =
    useState<boolean>(false);
  return (
    <KeyboardDismiss onDismiss={() => setCountryCodeSearchVisibility(false)}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={isIOS ? 'padding' : undefined}>
        <View style={styles.container}>
          <Header />
          <View style={commonStyles.baseSubScreen}>
            <Tiers
              showCountriesList={setCountryCodeSearchVisibility}
              isCountriesVisible={isCountryCodeSearchVisible}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </KeyboardDismiss>
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
