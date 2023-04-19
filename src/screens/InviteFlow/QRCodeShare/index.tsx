// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {QRCodePreview} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview';
import {QRShareCard} from '@screens/InviteFlow/QRCodeShare/components/QRShareCard';
import React, {memo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

export const QRCodeShare = memo(() => {
  useFocusStatusBar({style: 'light-content'});

  const qrCodePreviewRef = useRef(null);

  return (
    <View style={[styles.container]}>
      <LinesBackground />
      <Header color={COLORS.white} backgroundColor={'transparent'} />
      <View style={commonStyles.flexOne}>
        <QRCodePreview ref={qrCodePreviewRef} />
        <QRShareCard qrCodePreviewRef={qrCodePreviewRef} />
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
