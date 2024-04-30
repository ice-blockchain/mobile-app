// SPDX-License-Identifier: ice License 1.0

import {SocialKycStepNumber} from '@api/tokenomics/types';
import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useOnHardwareBack} from '@hooks/useOnHardwareBack';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {
  BUTTON_HEIGHT,
  BUTTON_WIDTH,
  FOOTER_PADDING_HORIZONTAL,
} from '@screens/SocialKycFlow/constants';
import {Details} from '@screens/SocialKycFlow/ResultStep/components/Details';
import {
  socialKycAttemptsSelector,
  socialKycStatusSelector,
} from '@store/modules/SocialKyc/selectors';
import {t} from '@translations/i18n';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  kycStep: SocialKycStepNumber;
  onTryAgain: () => void;
  onSkip: (skipKYCStep?: SocialKycStepNumber) => void;
};

export function ResultStep({onTryAgain, onSkip, kycStep}: Props) {
  const socialKycStatus = useSelector(socialKycStatusSelector);
  const socialKycAttempts = useSelector(socialKycAttemptsSelector);
  const canContinue =
    socialKycStatus === 'SUCCESS' ||
    (socialKycStatus === 'FAILED' && !socialKycAttempts);
  const onContinue = () => {
    onSkip();
  };

  useOnHardwareBack({callback: () => {}, preventDefault: true});

  return (
    <View style={commonStyles.flexOne}>
      <Header
        showBackButton={false}
        color={COLORS.primaryDark}
        title={t('social_kyc.header')}
        backgroundColor={'transparent'}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              socialKycStatus === 'SUCCESS'
                ? Images.badges.socialKyc.success
                : Images.badges.socialKyc.failure
            }
          />
        </View>
        <View style={styles.detailsContainer}>
          <Details kycStep={kycStep} />
        </View>
        <View style={styles.footerContainer}>
          <PrimaryButton
            style={styles.button}
            text={canContinue ? t('button.continue') : t('button.try_again')}
            onPress={canContinue ? onContinue : onTryAgain}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingTop: rem(40),
  },
  imageContainer: {
    alignSelf: 'center',
    paddingTop: rem(45),
  },
  detailsContainer: {
    paddingTop: rem(26),
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: FOOTER_PADDING_HORIZONTAL,
    paddingBottom: rem(40),
    paddingTop: rem(34),
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
  },
});
