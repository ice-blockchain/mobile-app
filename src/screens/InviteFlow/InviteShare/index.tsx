// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

export const InviteShare = memo(() => {
  useFocusStatusBar({style: 'light-content'});
  const {shadowStyle} = useScrollShadow();

  return (
    <View style={styles.container}>
      <Header containerStyle={shadowStyle} color={COLORS.white} />
      <View style={styles.card} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.persianBlue,
  },
  card: {
    position: 'absolute',
    borderTopLeftRadius: rem(20),
    borderTopRightRadius: rem(20),
    backgroundColor: COLORS.white,
    left: 0,
    bottom: 0,
    width: screenWidth,
    height: rem(242),
  },
});
