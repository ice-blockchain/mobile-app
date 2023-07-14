// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {
  STAKING_RATE_PERCENTAGES_MAX,
  STAKING_YEARS_MAX,
} from '@constants/staking';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CoinsStackIcon} from '@svg/CoinsStackIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  oneColumn?: boolean;
};

export const PreStakingCall = ({oneColumn}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  return (
    <View style={oneColumn ? styles.columnContainer : styles.container}>
      <Text style={[styles.titleText, oneColumn ? styles.columnText : null]}>
        {t('staking.appeal')}
      </Text>
      <Text style={[styles.noteText, oneColumn ? styles.columnText : null]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  columnContainer: {
    alignItems: 'flex-start',
  },
  titleText: {
    marginTop: rem(22),
    marginHorizontal: rem(32),
    ...font(18, 24, 'black', 'primaryDark', 'center'),
  },
  noteText: {
    marginTop: rem(14),
    marginHorizontal: rem(32),
    ...font(12, 17, 'medium', 'secondary', 'center'),
  },
  columnText: {
    textAlign: 'left',
    marginHorizontal: SCREEN_SIDE_OFFSET,
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
    ...font(14, 19, 'black', 'white'),
  },
});
