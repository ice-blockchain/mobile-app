// SPDX-License-Identifier: ice License 1.0

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {EyeIcon} from '@svg/EyeIcon';
import {isRTL, t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem} from 'rn-units';

const ICON_SIZE = rem(16);

export function ShowExample() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  return (
    <Touchable
      style={styles.outerContainer}
      onPress={() => navigation.navigate('RepostExample')}>
      <View style={styles.container}>
        <EyeIcon
          width={ICON_SIZE}
          height={ICON_SIZE}
          fill={COLORS.primaryLight}
        />
        <Text style={styles.text}>
          {t('social_kyc.instructions_step.show_example')}
        </Text>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(24),
    minHeight: rem(34),
    backgroundColor: COLORS.secondaryFaint,
    paddingHorizontal: rem(16),
  },
  text: {
    paddingLeft: isRTL && isAndroid ? null : rem(6),
    paddingRight: isRTL && isAndroid ? rem(6) : null,
    ...font(14, 18, 'regular', 'primaryLight', 'left'),
  },
});
