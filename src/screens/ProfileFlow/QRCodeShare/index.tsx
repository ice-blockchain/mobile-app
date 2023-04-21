// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {QRCodePreview} from '@screens/ProfileFlow/QRCodeShare/components/QRCodePreview';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

export const QRCodeShare = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  return (
    <View style={[styles.container]}>
      <LinesBackground />
      <Header color={COLORS.white} backgroundColor={'transparent'} />
      <View style={commonStyles.flexOne}>
        <QRCodePreview />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
});
