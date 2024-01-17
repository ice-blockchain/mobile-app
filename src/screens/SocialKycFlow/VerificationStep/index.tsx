// SPDX-License-Identifier: ice License 1.0

import {VERIFY_SOCIAL_ACCOUNT_KYC_STEP} from '@api/tokenomics/constants';
import {SocialKycStepNumber} from '@api/tokenomics/types';
import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CommonInput} from '@components/Inputs/CommonInput';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {commonStyles} from '@constants/styles';
import {useOnHardwareBack} from '@hooks/useOnHardwareBack';
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
import {useCountdown} from '@screens/SocialKycFlow/VerificationStep/hooks/useCountdown';
import {SocialKycActions} from '@store/modules/SocialKyc/actions';
import {
  socialKycErrorMessageSelector,
  socialKycStatusSelector,
} from '@store/modules/SocialKyc/selectors';
import {SocialKycMethod, SocialKycStatus} from '@store/modules/SocialKyc/types';
import {isSocialKycFinalized} from '@store/modules/SocialKyc/utils';
import {CopyIcon} from '@svg/LinkIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
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

function getButtonText({
  socialKycStatus,
  countdown,
}: {
  socialKycStatus: SocialKycStatus | null;
  countdown: number;
}) {
  if (socialKycStatus === 'LOADING') {
    if (countdown) {
      return t('social_kyc.verification_step.action.countdown', {countdown});
    }
    return t('social_kyc.verification_step.action.wait');
  }
  return t('social_kyc.verification_step.action.verify');
}

const VERIFICATION_COUNTDOWN_DURATION = 120;

export function VerificationStep({
  socialKycMethod,
  updateStepPassed,
  kycStep,
  onGoBack,
  onSkip,
}: Props) {
  const [repostLinkUrl, setRepostLinkUrl] = useState('');
  const socialKycStatus = useSelector(socialKycStatusSelector);
  const socialKycErrorMessage = useSelector(socialKycErrorMessageSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSocialKycFinalized(socialKycStatus)) {
      updateStepPassed();
    } else if (socialKycStatus === 'SKIPPABLE_ERROR') {
      onSkip();
    }
  }, [onSkip, socialKycStatus, updateStepPassed]);
  const {countdown, startCountdown, stopCountdown} = useCountdown({
    startingValueInSeconds: VERIFICATION_COUNTDOWN_DURATION,
  });
  useEffect(() => {
    if (socialKycStatus !== 'LOADING') {
      stopCountdown();
    }
  }, [socialKycStatus, stopCountdown]);
  useEffect(() => {
    if (socialKycErrorMessage && socialKycStatus === 'ERROR') {
      navigate({
        name: 'PopUp',
        key: 'social-kyc-verification-popup',
        params: {
          title: (
            <Text style={styles.warningText}>
              {t('social_kyc.verification_step.pop_up.title')}
            </Text>
          ),
          message: (
            <Message
              text={t('social_kyc.verification_step.pop_up.description', {
                link: LINKS.X_REPOST_LINK_EXAMPLE,
              })}
            />
          ),
          buttons: [
            {
              text: t('button.close'),
              style: styles.closeButton,
            },
          ],
          dismissOnAndroidHardwareBack: false,
          dismissOnOutsideTouch: false,
          dismissOnButtonPress: true,
        },
      });
    }
  }, [dispatch, socialKycErrorMessage, socialKycStatus]);
  const onContinue = () => {
    dispatch(
      SocialKycActions.SOCIAL_KYC_VERIFICATION.START.create({
        postUrl: repostLinkUrl,
        socialKycMethod,
        kycStep,
      }),
    );
    startCountdown();
  };

  useOnHardwareBack({callback: onGoBack, preventDefault: true});

  return (
    <View style={commonStyles.flexOne}>
      <Header
        preventDefaultAction
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
            stepNumber={kycStep === VERIFY_SOCIAL_ACCOUNT_KYC_STEP ? 4 : 3}
            description={t('social_kyc.verification_step.instructions_step.4')}
          />
          <View style={styles.separator} />
          <CommonInput
            label={t('social_kyc.verification_step.placeholder')}
            onChangeText={(text: string) => {
              if (socialKycErrorMessage) {
                dispatch(
                  SocialKycActions.RESET_SOCIAL_KYC_STATUS.STATE.create(),
                );
              }
              setRepostLinkUrl(text);
            }}
            icon={
              <CopyIcon
                color={COLORS.secondary}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
            }
            editable={socialKycStatus !== 'LOADING'}
            errorText={socialKycErrorMessage}
            value={repostLinkUrl}
          />
        </View>
        <View style={styles.footerContainer}>
          <PrimaryButton
            style={styles.button}
            text={getButtonText({countdown, socialKycStatus})}
            onPress={onContinue}
            loading={socialKycStatus === 'LOADING'}
            disabled={!repostLinkUrl || socialKycStatus === 'LOADING'}
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
  warningText: {
    ...font(24, 32, 'black', 'attention', 'center'),
  },
  closeButton: {
    width: '70%',
  },
});
