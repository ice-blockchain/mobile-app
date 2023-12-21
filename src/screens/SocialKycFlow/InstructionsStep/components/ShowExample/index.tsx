// SPDX-License-Identifier: ice License 1.0

import {SocialKycStepNumber} from '@api/tokenomics/types';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {EyeIcon} from '@svg/EyeIcon';
import {t} from '@translations/i18n';
import {font, paddingLeftRtl} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

const ICON_SIZE = rem(16);

export function ShowExample({kycStep}: {kycStep: SocialKycStepNumber}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  return (
    <Touchable
      style={styles.outerContainer}
      onPress={() => navigation.navigate('RepostExample', {kycStep})}>
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
    ...paddingLeftRtl(rem(6)),
    ...font(14, 18, 'regular', 'primaryLight', 'left'),
  },
});
