// SPDX-License-Identifier: ice License 1.0

import {CloseButton} from '@components/Buttons/CloseButton';
import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
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
import {BookIcon} from '@svg/BookIcon';
import {QuestionIcon} from '@svg/QuestionIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

export const QuizFailure = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {shadowStyle} = useScrollShadow();

  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const handleFAQ = () => {
    openLinkWithInAppBrowser({url: LINKS.ICE_FAQ});
  };

  const handleKnowledgeBase = () => {
    openLinkWithInAppBrowser({url: LINKS.KNOWLEDGE_BASE});
  };

  const handleClose = () => {
    dispatch(QuizActions.START_OR_CONTINUE_QUIZ.COMPLETED.create());
    navigation.popToTop();
  };

  useOnHardwareBack({callback: handleClose, preventDefault: true});

  return (
    <View style={commonStyles.flexOne}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('quiz.title')}
        showBackButton={false}
        renderRightButtons={() => <CloseButton onPress={handleClose} />}
      />
      <ScrollView
        style={commonStyles.flexOne}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={commonStyles.flexOne}>
          <Image source={Images.quiz.quizFailed} style={styles.icon} />
          <Text style={styles.title}>{t('quiz.quiz_failure.title')}</Text>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              {t('quiz.quiz_failure.description')}
            </Text>
            <Text style={styles.descriptionText}>
              {t('quiz.quiz_failure.check_faq')}
            </Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <PrimaryButton
            onPress={handleFAQ}
            text={t('button.faq')}
            icon={<QuestionIcon />}
            style={styles.button}
          />
          <PrimaryButton
            onPress={handleKnowledgeBase}
            text={t('button.knowledge_base')}
            icon={<BookIcon />}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </View>
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
    marginTop: rem(24),
  },
  buttons: {
    paddingTop: rem(10),
    paddingBottom: rem(34),
  },
  description: {
    marginTop: rem(10),
  },
  descriptionText: {
    ...font(14, 18, 'medium', 'secondary', 'center'),
    marginTop: rem(10),
  },
  button: {
    height: rem(48),
    borderRadius: rem(16),
    marginTop: rem(20),
  },
});
