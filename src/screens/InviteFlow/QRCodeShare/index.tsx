// SPDX-License-Identifier: ice License 1.0

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useBottomOffsetStyle} from '@navigation/hooks/useBottomOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {QRCodePreview} from '@screens/InviteFlow/QRCodeShare/components/QRCodePreview';
import {QRShareCard} from '@screens/InviteFlow/QRCodeShare/components/QRShareCard';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import React, {memo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

export const QRCodeShare = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomOffsetStyle();

  const user = useSelector(unsafeUserSelector);
  const qrCodePreviewRef = useRef(null);

  return (
    <View style={[styles.container, bottomOffset.current]}>
      <LinesBackground />
      <Header color={COLORS.white} backgroundColor={'transparent'} />
      <View style={commonStyles.flexOne}>
        <QRCodePreview user={user} ref={qrCodePreviewRef} />
        <QRShareCard user={user} qrCodePreviewRef={qrCodePreviewRef} />
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
