// SPDX-License-Identifier: ice License 1.0

import {PopUpButton} from '@components/Buttons/PopUpButton';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {InfoBlock} from '@screens/QuizFlow/CommunityUpdate/components/InfoBlock';
import {PrivacyTerms} from '@screens/QuizFlow/CommunityUpdate/components/PrivacyTerms';
import {useSetQuizTerms} from '@screens/QuizFlow/CommunityUpdate/hooks/useSetQuizTerms';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const CommunityUpdate = () => {
  useFocusStatusBar({style: 'dark-content'});
  const {shadowStyle} = useScrollShadow();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const {termsAccepted, setTermsAccepted, confirmTerms, isConfirmLoading} =
    useSetQuizTerms();

  return (
    <View style={commonStyles.flexOne}>
      <Header
        containerStyle={shadowStyle}
        color={COLORS.primaryDark}
        title={t('quiz.community_update.navigation_title')}
      />
      <ScrollView
        style={commonStyles.flexOne}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Image source={Images.quiz.quiz} style={styles.icon} />
        <Text style={styles.title}>{t('quiz.community_update.title')}</Text>
        <Text style={styles.description}>
          {t('quiz.community_update.description')}
        </Text>
        <InfoBlock
          title={t('quiz.community_update.knowledge_verification.title')}
          description={t(
            'quiz.community_update.knowledge_verification.description',
          )}
          points={[
            t('quiz.community_update.knowledge_verification.point1'),
            t('quiz.community_update.knowledge_verification.point2'),
            t('quiz.community_update.knowledge_verification.point3'),
          ]}
        />
        <InfoBlock
          title={t('quiz.community_update.community_engagement.title')}
          description={t(
            'quiz.community_update.community_engagement.description',
          )}
          points={[
            t('quiz.community_update.community_engagement.point1'),
            t('quiz.community_update.community_engagement.point2'),
            t('quiz.community_update.community_engagement.point3'),
          ]}
          bottomDescription={t(
            'quiz.community_update.community_engagement.bottom_description',
          )}
        />
        <PrivacyTerms
          onCheckBoxPress={setTermsAccepted}
          isAgreeWithTerms={termsAccepted}
        />
      </ScrollView>
      <View style={[styles.buttonsContainer, commonStyles.shadow]}>
        <PopUpButton
          text={t('button.not_now')}
          preset="outlined"
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.button}
        />
        <PopUpButton
          text={t('button.continue')}
          onPress={confirmTerms}
          disabled={!termsAccepted || isConfirmLoading}
          loading={isConfirmLoading}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    width: '65%',
    marginTop: rem(18),
  },
  title: {
    ...font(24, 30, 'black', 'primaryDark', 'left'),
    marginTop: rem(24),
  },
  contentContainer: {
    paddingHorizontal: rem(16),
    paddingBottom: rem(20),
    flexGrow: 1,
  },
  description: {
    ...font(14, 19, 'medium', 'secondary', 'left'),
    marginTop: rem(16),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingTop: rem(16),
    paddingBottom: rem(30),
  },
  button: {
    width: '40%',
  },
});
