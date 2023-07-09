// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {
  STAKING_RATE_PERCENTAGES_MAX,
  STAKING_YEARS_MAX,
} from '@constants/staking';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const PreStakingCall = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  return (
    <>
      <Text style={styles.titleText}>{t('staking.appeal')}</Text>
      <Text style={styles.noteText}>
        {t('staking.benefits_description', {
          periodYears: STAKING_YEARS_MAX,
          ratePercentages: STAKING_RATE_PERCENTAGES_MAX,
        })}
      </Text>
      <PrimaryButton
        onPress={() => {
          navigation.goBack();
          setTimeout(() => navigation.navigate('Staking'));
        }}
        text={t('staking.stake_now')}
        style={styles.button}
        textStyle={styles.buttonText}
        icon={
          <CoinsStackIcon
            color={COLORS.white}
            width={rem(18)}
            height={rem(18)}
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    marginTop: rem(22),
    marginHorizontal: rem(32),
    ...font(18, 22, 'black', 'primaryDark', 'center'),
  },
  noteText: {
    marginTop: rem(14),
    marginHorizontal: rem(32),
    ...font(12, 17, 'medium', 'secondary', 'center'),
  },
  button: {
    marginTop: rem(20),
    backgroundColor: COLORS.shamrock,
    height: rem(44),
    alignSelf: 'center',
    paddingHorizontal: rem(16),
    marginBottom: rem(42),
    borderRadius: rem(12),
  },
  buttonText: {
    ...font(14, 18, 'black', 'white'),
  },
});
