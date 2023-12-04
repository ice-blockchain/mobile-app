// SPDX-License-Identifier: ice License 1.0

import {SocialKycStepNumber} from '@api/tokenomics/types';
import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CommonInput} from '@components/Inputs/CommonInput';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {navigate} from '@navigation/utils';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {StepInstruction} from '@screens/SocialKycFlow/components/StepInstruction';
import {VerifyWithHeader} from '@screens/SocialKycFlow/components/VerifyWithHeader';
import {
  BUTTON_HEIGHT,
  BUTTON_WIDTH,
  FOOTER_PADDING_HORIZONTAL,
} from '@screens/SocialKycFlow/constants';
import {Confirmation} from '@screens/SocialKycFlow/VerificationStep/components/Confirmation';
import {SocialKycActions} from '@store/modules/SocialKyc/actions';
import {socialKycStatusSelector} from '@store/modules/SocialKyc/selectors';
import {SocialKycMethod} from '@store/modules/SocialKyc/types';
import {isSocialKycFinalized} from '@store/modules/SocialKyc/utils';
import {CopyIcon} from '@svg/LinkIcon';
import {t} from '@translations/i18n';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  socialKycMethod: SocialKycMethod;
  updateStepPassed: () => void;
  onGoBack: () => void;
  onSkip: (skipKYCStep?: SocialKycStepNumber) => void;
  kycStep: SocialKycStepNumber;
};

const ICON_SIZE = rem(24);

export function VerificationStep({
  socialKycMethod,
  updateStepPassed,
  kycStep,
  onGoBack,
  onSkip,
}: Props) {
  const [repostLinkUrl, setRepostLinkUrl] = useState('');
  const socialKycStatus = useSelector(socialKycStatusSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSocialKycFinalized(socialKycStatus)) {
      updateStepPassed();
    } else if (socialKycStatus === 'ERROR') {
      onSkip();
    }
  }, [kycStep, onSkip, socialKycStatus, updateStepPassed]);
  const onContinue = () => {
    navigate({
      name: 'PopUp',
      params: {
        title: t('social_kyc.verification_step.pop_up.title'),
        message: (
          <Message
            text={t('social_kyc.verification_step.pop_up.description')}
          />
        ),
        buttons: [
          {
            text: t('button.no'),
            preset: 'outlined',
          },
          {
            text: t('button.confirm'),
            onPress: () => {
              dispatch(
                SocialKycActions.SOCIAL_KYC_VERIFICATION.START.create({
                  postUrl: repostLinkUrl,
                  socialKycMethod,
                  kycStep,
                }),
              );
            },
          },
        ],
        dismissOnAndroidHardwareBack: false,
        dismissOnOutsideTouch: false,
      },
    });
  };
  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={t('social_kyc.header')}
        backgroundColor={'transparent'}
        onGoBack={onGoBack}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <VerifyWithHeader socialKycMethod={socialKycMethod} />
        <View style={styles.confirmationContainer}>
          <Confirmation />
        </View>
        <View style={styles.instructionsContainer}>
          <StepInstruction
            stepNumber={4}
            description={t('social_kyc.verification_step.instructions_step.4')}
          />
          <View style={styles.separator} />
          <CommonInput
            label={t('social_kyc.verification_step.placeholder')}
            onChangeText={setRepostLinkUrl}
            icon={
              <CopyIcon
                color={COLORS.secondary}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
            }
            value={repostLinkUrl}
          />
        </View>
        <View style={styles.footerContainer}>
          <PrimaryButton
            style={[socialKycMethod ? styles.button : styles.disabledButton]}
            text={
              socialKycStatus === 'LOADING'
                ? t('social_kyc.verification_step.action.wait')
                : t('social_kyc.verification_step.action.verify')
            }
            onPress={onContinue}
            loading={socialKycStatus === 'LOADING'}
            disabled={!repostLinkUrl}
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
  instructionsContainer: {
    paddingHorizontal: rem(16),
  },
  confirmationContainer: {
    paddingTop: rem(52),
    paddingBottom: rem(24),
  },
  separator: {
    height: rem(16),
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
  disabledButton: {
    width: BUTTON_WIDTH,
    backgroundColor: COLORS.primaryDark,
    opacity: 0.5,
  },
});
