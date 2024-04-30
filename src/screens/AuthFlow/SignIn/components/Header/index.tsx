// SPDX-License-Identifier: ice License 1.0

import {COLORS} from '@constants/colors';
import {windowWidth} from '@constants/styles';
import {useTopOffsetStyle} from '@hooks/useTopOffsetStyle';
import {Images} from '@images';
import {LogoIcon} from '@svg/LogoIcon';
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
        <LogoIcon
          color={COLORS.white}
          width={rem(90)}
          height={rem(90)}
          style={styles.icon}
        />
        <Text style={styles.welcomeText}>{t('signIn.welcome')}</Text>
        <Text style={styles.sloganText}>{t('signIn.slogan')}</Text>
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
    height: rem(250),
    alignItems: 'center',
  },
  icon: {
    marginTop: rem(24),
  },
  welcomeText: {
    marginTop: rem(26),
    ...font(28, 34, 'black'),
  },
  sloganText: {
    marginTop: rem(14),
    ...font(13, 17, 'regular'),
    textTransform: 'uppercase',
  },
});
