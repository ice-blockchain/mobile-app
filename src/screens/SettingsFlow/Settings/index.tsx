// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

export const Settings = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  return (
    <View style={styles.container}>
      <Header
        color={COLORS.white}
        title={'Settings'}
        titlePreset={'small'}
        renderRightButtons={LangButton}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
});
