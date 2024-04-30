// SPDX-License-Identifier: ice License 1.0

import {ConfirmCodeBack} from '@components/Forms/components/ConfirmCode/components/ConfirmCodeBack';
import {EmailCode} from '@components/Forms/components/EmailCode';
import {useConfirmEmailCode} from '@components/Forms/ConfirmEmailCodeForm/hooks/useConfirmEmailCode';
import {LottieView} from '@components/LottieView';
import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {LottieAnimations} from '@lottie';
import {PenWithFrameIcon} from '@svg/PenWithFrameIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const ConfirmEmailCodeForm = () => {
  const {email, code, goBack} = useConfirmEmailCode();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
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
      </View>
      <Text style={styles.instructionText}>
        {t('confirm_email.link_instruction')}
      </Text>
      {code && <EmailCode code={code} containerStyle={styles.emailCode} />}
      <View style={styles.bottomContainer}>
        <View style={styles.animationContainer}>
          <LottieView
            style={styles.animation}
            source={LottieAnimations.loadingLogoBlue}
            autoPlay={true}
            loop={true}
          />
        </View>
      </View>
      <ConfirmCodeBack onPress={goBack} text={t('confirm_email.wrong_email')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  descriptionText: {
    marginHorizontal: rem(12),
    ...font(16, 26, 'medium', 'secondary', 'center'),
  },
  email: {
    marginTop: rem(4),
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
    ...font(16, 26, 'medium', 'secondary', 'center'),
    width: rem(250),
    alignSelf: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    flexDirection: 'column',
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
  topContainer: {
    marginTop: rem(50),
  },
  emailCode: {
    marginTop: rem(16),
  },
});
