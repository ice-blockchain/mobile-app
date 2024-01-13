// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {windowWidth} from '@constants/styles';
import {Images} from '@images';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AVATAR_SIDE_DIMENSION} from '@screens/QuizFlow/Theme';
import {QuizActions} from '@store/modules/Quiz/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export const QuizSuccess = () => {
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const handleContinue = () => {
    dispatch(QuizActions.RESET_QUIZ.RESET.create());
    dispatch(TokenomicsActions.START_MINING_SESSION.START.create({}));
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={Images.quiz.quiz} style={styles.icon} />
        <Text style={styles.title}>{t('quiz.quiz_success.title')}</Text>
        <Text style={styles.description}>
          {t('quiz.quiz_success.description')}
        </Text>
      </View>
      <View>
        <PrimaryButton
          onPress={handleContinue}
          text={t('button.continue')}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: rem(30),
  },
  icon: {
    alignSelf: 'center',
    width: AVATAR_SIDE_DIMENSION,
    height: AVATAR_SIDE_DIMENSION,
    marginBottom: rem(26),
  },
  title: {
    ...font(24, 30, 'black', 'primaryDark', 'center'),
    marginBottom: rem(20),
    marginHorizontal: rem(53),
  },
  description: {
    ...font(14, 19, 'medium', 'secondary', 'center'),
    marginHorizontal: rem(53),
  },
  button: {
    width: windowWidth - rem(90),
    alignItems: 'center',
    justifyContent: 'center',
    height: rem(40),
    borderRadius: rem(12),
    alignSelf: 'center',
  },
});
