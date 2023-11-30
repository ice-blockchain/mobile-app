// SPDX-License-Identifier: ice License 1.0

import {SocialKycStepNumber} from '@api/tokenomics/types';
import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {navigate} from '@navigation/utils';
import Clipboard from '@react-native-clipboard/clipboard';
import {Message} from '@screens/Modals/PopUp/components/Message';
import {StepInstruction} from '@screens/SocialKycFlow/components/StepInstruction';
import {VerifyWithHeader} from '@screens/SocialKycFlow/components/VerifyWithHeader';
import {
  BUTTON_HEIGHT,
  BUTTON_WIDTH,
  FOOTER_PADDING_HORIZONTAL,
} from '@screens/SocialKycFlow/constants';
import {ShowExample} from '@screens/SocialKycFlow/InstructionsStep/components/ShowExample';
import {Tooltip} from '@screens/SocialKycFlow/InstructionsStep/components/Tooltip';
import {getFacebookAccessTokenForUserPosts} from '@services/auth/signin/facebook';
import {SocialKycActions} from '@store/modules/SocialKyc/actions';
import {
  socialKycRepostTextSelector,
  socialKycStatusSelector,
} from '@store/modules/SocialKyc/selectors';
import {SocialKycMethod, SocialKycStatus} from '@store/modules/SocialKyc/types';
import {isSocialKycFinalized} from '@store/modules/SocialKyc/utils';
import {CopyIcon} from '@svg/CopyIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, Vibration, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  updateStepPassed: () => void;
  onGoBack: () => void;
  socialKycMethod: SocialKycMethod;
  onSkip: (skipKYCStep?: SocialKycStepNumber) => void;
  kycStep: SocialKycStepNumber;
};

function getPrimaryButtonText({
  socialKycMethod,
  socialKycStatus,
}: {
  socialKycMethod: SocialKycMethod;
  socialKycStatus: SocialKycStatus | null;
}) {
  if (socialKycMethod === 'Facebook') {
    return socialKycStatus === 'LOADING'
      ? t('social_kyc.verification_step.action.wait')
      : t('social_kyc.verification_step.action.verify');
  }
  return t('button.continue');
}

export function InstructionsStep({
  updateStepPassed,
  socialKycMethod,
  onGoBack,
  onSkip,
  kycStep,
}: Props) {
  const [isTextCopied, setIsTextCopied] = useState(false);
  const repostText = useSelector(socialKycRepostTextSelector);
  const copyText = () => {
    Clipboard.setString(repostText);
    setIsTextCopied(true);
    Vibration.vibrate([0, 50]);
  };
  const socialKycStatus = useSelector(socialKycStatusSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (socialKycMethod === 'Facebook') {
      if (isSocialKycFinalized(socialKycStatus)) {
        updateStepPassed();
      } else if (socialKycStatus === 'ERROR') {
        onSkip(kycStep);
      }
    }
  }, [kycStep, onSkip, socialKycMethod, socialKycStatus, updateStepPassed]);
  const onConfirm = () => {
    if (socialKycMethod === 'Facebook') {
      getFacebookAccessTokenForUserPosts()
        .then(accessToken => {
          dispatch(
            SocialKycActions.SOCIAL_KYC_VERIFICATION.START.create({
              accessToken: accessToken?.accessToken,
              socialKycMethod,
              kycStep,
            }),
          );
        })
        .catch();
    } else {
      updateStepPassed();
    }
  };
  const onContinue = () => {
    navigate({
      name: 'PopUp',
      params: {
        title: t('social_kyc.instructions_step.x.pop_up.title'),
        message: (
          <Message
            text={t('social_kyc.instructions_step.x.pop_up.description')}
          />
        ),
        buttons: [
          {
            text: t('button.no'),
            preset: 'outlined',
          },
          {
            text: t('button.confirm'),
            onPress: onConfirm,
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
        <View style={styles.showExampleContainer}>
          {socialKycMethod === 'X' ? <ShowExample /> : null}
        </View>
        <View style={styles.instructionsContainer}>
          <StepInstruction
            stepNumber={1}
            description={t('social_kyc.instructions_step.x.1')}
          />
          <View style={styles.separator} />
          <StepInstruction
            stepNumber={2}
            description={t('social_kyc.instructions_step.x.2')}
          />
          <View style={styles.separator} />
          <StepInstruction
            stepNumber={3}
            description={t('social_kyc.instructions_step.x.3')}
            allBordersRounded={false}
            rightIcon={<CopyIcon width={rem(24)} />}
            onRightIconPress={copyText}
          />
          <Touchable style={styles.repostTextContainer} onPress={copyText}>
            <Text style={styles.repostText}>{repostText}</Text>
          </Touchable>
          <Tooltip onCopy={copyText} isTextCopied={isTextCopied} />
        </View>
        <View style={styles.footerContainer}>
          <PrimaryButton
            text={getPrimaryButtonText({socialKycMethod, socialKycStatus})}
            disabled={!isTextCopied}
            style={[socialKycMethod ? styles.button : styles.disabledButton]}
            loading={socialKycStatus === 'LOADING'}
            onPress={onContinue}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const BORDER_RADIUS = rem(16);

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
  showExampleContainer: {
    paddingVertical: rem(24),
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
  repostTextContainer: {
    padding: rem(12),
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.paleSkyBlue,
  },
  repostText: {
    ...font(13, 18, 'medium', 'primaryDark', 'left'),
  },
});
