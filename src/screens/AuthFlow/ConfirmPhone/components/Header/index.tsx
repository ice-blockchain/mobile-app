// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {useTopOffsetStyle} from '@hooks/useTopOffsetStyle';
import {Images} from '@images';
import {ChatBubbleIcon} from '@svg/ChatBubbleIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const Header = () => {
  const topOffset = useTopOffsetStyle();
  return (
    <View style={topOffset.current}>
      {/* for too tall devices */}
      <View style={styles.overscrollTop} />
      <Image
        source={Images.backgrounds.linesHeaderBg}
        style={styles.background}
        resizeMode={'cover'}
      />
      <View style={styles.body}>
        <ChatBubbleIcon
          color={COLORS.white}
          width={rem(100)}
          height={rem(100)}
        />
        <Text style={styles.actionText}>{t('confirm_code.enter_code')}</Text>
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
  overscrollTop: {
    paddingTop: 2000,
    marginTop: -2000,
    backgroundColor: COLORS.primaryLight,
  },
  body: {
    height: rem(321),
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    marginTop: rem(20),
    ...font(28, 34, 'black'),
  },
});
