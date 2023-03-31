// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {useTopOffsetStyle} from '@hooks/useTopOffsetStyle';
import {Images} from '@images';
import {AttentionIcon} from '@svg/AttentionIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const Header = () => {
  const topOffset = useTopOffsetStyle();
  return (
    <View style={topOffset.current}>
      <Image
        source={Images.backgrounds.linesHeaderBg}
        style={styles.background}
        resizeMode={'cover'}
      />
      <View style={styles.body}>
        <AttentionIcon
          color={COLORS.white}
          width={rem(100)}
          height={rem(100)}
        />
        <Text style={styles.title}>{t('invalid_link.title')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: windowWidth,
    height: (windowWidth * 368) / 375,
    position: 'absolute',
    bottom: 0,
  },
  body: {
    height: rem(321),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: rem(24),
    ...font(28, 34, 'black'),
  },
});
