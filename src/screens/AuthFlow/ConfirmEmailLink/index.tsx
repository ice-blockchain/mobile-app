// SPDX-License-Identifier: ice License 1.0

import {BackButton} from '@components/Buttons/BackButton';
import {FullScreenLoading} from '@components/FullScreenLoading';
import {LottieView} from '@components/LottieView';
import {PrivacyTerms} from '@components/PrivacyTerms';
import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {LottieAnimations} from '@lottie';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Header} from '@screens/AuthFlow/ConfirmEmailLink/components/Header';
import {useConfirmEmailLink} from '@screens/AuthFlow/ConfirmEmailLink/hooks/useConfirmEmailLink';
import {PenWithFrameIcon} from '@svg/PenWithFrameIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const ConfirmEmailLink = () => {
  useFocusStatusBar({style: 'light-content'});
  const {email, validateLoading, goBack} = useConfirmEmailLink();

  return (
    <View style={styles.container}>
      <Header />
      <BackButton onPress={goBack} />
      <Text style={styles.descriptionText}>
        {t('confirm_email.emailed_link_to')}
      </Text>
      <View style={styles.email}>
        <Text style={styles.emailText} numberOfLines={1}>
          {email}
        </Text>
        <Touchable hitSlop={MIDDLE_BUTTON_HIT_SLOP} onPress={goBack}>
          <PenWithFrameIcon
            width={rem(14)}
            height={rem(14)}
            style={styles.emailIcon}
          />
        </Touchable>
      </View>
      <Text style={styles.instructionText}>
        {t('confirm_email.link_instruction')}
      </Text>
      <View style={styles.bottomContainer}>
        <View style={styles.animationContainer}>
          <LottieView
            style={styles.animation}
            source={LottieAnimations.loadingLogoBlue}
            autoPlay={true}
            loop={true}
          />
        </View>
        <PrivacyTerms />
      </View>
      {validateLoading && <FullScreenLoading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionText: {
    marginTop: rem(24),
    marginHorizontal: rem(12),
    ...font(16, 26, 'medium', 'secondary', 'center'),
  },
  email: {
    marginTop: rem(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    flexShrink: 1,
    ...font(16, 26, 'black', 'secondary', 'center'),
  },
  emailIcon: {
    marginLeft: rem(14),
  },
  instructionText: {
    marginTop: rem(40),
    ...font(16, 26, 'medium', 'secondary', 'center'),
    width: rem(180),
    alignSelf: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  animation: {
    width: rem(69),
    height: rem(69),
    alignSelf: 'center',
  },
});
