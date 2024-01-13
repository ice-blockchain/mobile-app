// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {commonStyles, windowWidth} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CloseButton} from '@screens/Modals/PopUp/components/CloseButton';
import {QuizActions} from '@store/modules/Quiz/actions';
import {BookIcon} from '@svg/BookIcon';
import {QuestionIcon} from '@svg/QuestionIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

export const AVATAR_SIDE_DIMENSION = screenWidth * 0.65;

export const MiningDisabled = () => {
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
    dispatch(QuizActions.RESET_QUIZ.RESET.create());
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('quiz.mining_disabled.navigation_title')}
        showBackButton={false}
        renderRightButtons={() => (
          <CloseButton style={styles.closeButton} onPress={handleClose} />
        )}
      />
      <Image source={Images.quiz.mining_disabled} style={styles.icon} />
      <Text style={styles.title}>{t('quiz.mining_disabled.title')}</Text>
      <Text style={styles.description}>
        {t('quiz.mining_disabled.description')}
      </Text>
      <Text style={styles.checkFaq}>{t('quiz.mining_disabled.check_faq')}</Text>
      <View style={commonStyles.flexOne} />
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
          style={[styles.button, styles.knowledgeButton]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  icon: {
    alignSelf: 'center',
    width: AVATAR_SIDE_DIMENSION,
    height: AVATAR_SIDE_DIMENSION,
    marginTop: rem(18),
  },
  title: {
    ...font(24, 30, 'black', 'primaryDark', 'center'),
    marginTop: rem(24),
  },
  buttons: {
    marginBottom: rem(60),
  },
  closeButton: {
    position: 'absolute',
    top: rem(22),
    right: rem(5),
  },
  description: {
    ...font(14, 19, 'medium', 'secondary', 'center'),
    marginTop: rem(20),
    marginHorizontal: rem(53),
  },
  checkFaq: {
    ...font(14, 19, 'medium', 'secondary', 'center'),
    marginTop: rem(24),
    marginHorizontal: rem(45),
  },
  button: {
    width: windowWidth - rem(90),
    alignItems: 'center',
    justifyContent: 'center',
    height: rem(40),
    borderRadius: rem(12),
    alignSelf: 'center',
  },
  knowledgeButton: {
    marginTop: rem(20),
  },
});
