// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useOnHardwareBack} from '@hooks/useOnHardwareBack';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QuizActions} from '@store/modules/Quiz/actions';
import {TokenomicsActions} from '@store/modules/Tokenomics/actions';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export const QuizSuccess = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {shadowStyle} = useScrollShadow();
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const handleContinue = () => {
    dispatch(QuizActions.RESET_QUIZ.RESET.create());
    dispatch(TokenomicsActions.START_MINING_SESSION.START.create());
    navigation.popToTop();
  };

  useOnHardwareBack({callback: handleContinue, preventDefault: true});

  return (
    <SafeAreaView style={commonStyles.flexOne} edges={['bottom']}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('quiz.title')}
        showBackButton={false}
        renderRightButtons={() => null}
      />
      <ScrollView
        style={commonStyles.flexOne}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={commonStyles.flexOne}>
          <Image source={Images.badges.socialKyc.success} style={styles.icon} />
          <Text style={styles.title}>{t('quiz.quiz_success.title')}</Text>
          <Text style={styles.description}>
            {t('quiz.quiz_success.description')}
          </Text>
        </View>
        <PrimaryButton
          onPress={handleContinue}
          text={t('button.continue')}
          style={styles.button}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: rem(40),
  },
  icon: {
    alignSelf: 'center',
    marginTop: rem(45),
    width: rem(250),
    height: rem(250),
  },
  title: {
    ...font(24, 30, 'black', 'primaryDark', 'center'),
    marginTop: rem(16),
  },
  description: {
    ...font(14, 18, 'medium', 'secondary', 'center'),
    marginTop: rem(20),
  },
  button: {
    height: rem(48),
    borderRadius: rem(16),
    marginBottom: rem(20),
  },
});
