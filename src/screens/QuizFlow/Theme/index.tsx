// SPDX-License-Identifier: ice License 1.0

import {BulletDescription} from '@components/BulletDescription';
import {
  DEFAULT_DIALOG_NO_BUTTON,
  PopUpButton,
} from '@components/Buttons/PopUpButton';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {QuizActions} from '@store/modules/Quiz/actions';
import {
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {replaceString, t, tagRegex} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {useEffect, useRef} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {hasNotch} from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

export const AVATAR_SIDE_DIMENSION = screenWidth * 0.65;

export const QuizTheme = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {shadowStyle} = useScrollShadow();
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const quizQuestionsLoaded = useSelector(
    isSuccessSelector.bind(null, QuizActions.START_OR_CONTINUE_QUIZ),
  );

  const quizQuestionsLoading = useSelector(
    isLoadingSelector.bind(null, QuizActions.START_OR_CONTINUE_QUIZ),
  );

  const startPressed = useRef(false);

  useEffect(() => {
    if (startPressed.current && quizQuestionsLoaded) {
      navigation.navigate('Quiz');
    }
  }, [quizQuestionsLoaded, navigation, startPressed]);

  const handleStart = () => {
    navigation.navigate('PopUp', {
      title: t('quiz.confirmation_popup.title'),
      message: t('quiz.confirmation_popup.start_description'),
      buttons: [
        DEFAULT_DIALOG_NO_BUTTON,
        {
          text: t('button.confirm'),
          onPress: () => {
            startPressed.current = true;
            dispatch(QuizActions.START_OR_CONTINUE_QUIZ.START.create({}));
          },
        },
      ],
    });
  };

  const handleCancel = () => {
    navigation.navigate('PopUp', {
      title: t('quiz.confirmation_popup.title'),
      message: t('quiz.confirmation_popup.cancel_description'),
      buttons: [
        DEFAULT_DIALOG_NO_BUTTON,
        {
          text: t('button.confirm'),
          onPress: () => {
            dispatch(QuizActions.RESET_QUIZ.RESET.create());
            navigation.goBack();
          },
        },
      ],
    });
  };

  const info = replaceString(
    t('quiz.theme.info'),
    tagRegex('link', false),
    (match, index) => {
      return (
        <Text
          key={match + index}
          style={styles.link}
          onPress={() => openLinkWithInAppBrowser({url: LINKS.KNOWLEDGE_BASE})}>
          {match}
        </Text>
      );
    },
  );

  return (
    <View style={styles.container}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('quiz.theme.navigation_title')}
        showBackButton={false}
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Image source={Images.quiz.quiz} style={styles.icon} />
        <Text style={styles.title}>{t('quiz.theme.todays_theme')}</Text>
        <Text style={styles.subtitle}>{t('quiz.theme.knowledge_check')}</Text>
        <View style={styles.bulletsContainer}>
          <BulletDescription
            text={t('quiz.theme.question_options')}
            style={styles.bulletContainer}
            textStyle={styles.bulletText}
            bulletStyle={styles.bullet}
            key={t('quiz.theme.question_options')}
          />
          <BulletDescription
            text={t('quiz.theme.answer_correctly')}
            textStyle={styles.bulletText}
            style={styles.bulletContainer}
            bulletStyle={styles.bullet}
            key={t('quiz.theme.answer_correctly')}
          />
          <BulletDescription
            text={t('quiz.theme.wrong_answer')}
            textStyle={styles.bulletText}
            style={styles.bulletContainer}
            bulletStyle={styles.bullet}
            key={t('quiz.theme.wrong_answer')}
          />
          <BulletDescription
            text={info}
            textStyle={styles.bulletText}
            style={styles.bulletContainer}
            bulletStyle={styles.bullet}
            key={'info'}
          />
        </View>
        <Text style={styles.subtitle}>{t('quiz.theme.why_quiz')}</Text>
        <Text style={styles.whyQuizDescription}>
          {t('quiz.theme.why_quiz_description')}
        </Text>
      </ScrollView>
      <View style={[styles.buttonsContainer, commonStyles.shadow]}>
        <PopUpButton
          text={t('button.cancel')}
          preset="outlined"
          onPress={handleCancel}
          style={styles.button}
        />
        <PopUpButton
          text={t('button.start')}
          onPress={handleStart}
          style={styles.button}
          loading={quizQuestionsLoading}
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
    ...font(24, 30, 'bold', 'primaryDark', 'left'),
    marginTop: rem(25),
  },
  contentContainer: {
    paddingHorizontal: rem(16),
    flexGrow: 1,
    paddingBottom: hasNotch() ? rem(130) : rem(115),
  },
  subtitle: {
    ...font(17, 25, 'bold', 'primaryDark', 'left'),
    marginTop: rem(24),
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'absolute',
    width: screenWidth,
    height: hasNotch() ? rem(98) : rem(85),
    bottom: 0,
    backgroundColor: COLORS.white,
    paddingTop: rem(16),
  },
  button: {
    width: screenWidth * 0.4,
  },
  bulletsContainer: {
    marginTop: rem(6),
  },
  bulletContainer: {
    marginTop: rem(12),
  },
  bullet: {
    backgroundColor: COLORS.emperor,
  },
  whyQuizDescription: {
    ...font(14, 19, 'medium', 'emperor', 'left'),
    marginTop: rem(16),
  },
  bulletText: {
    color: COLORS.emperor,
  },
  link: {
    ...font(14, 19, 'medium', 'socialLink', 'left'),
  },
});
