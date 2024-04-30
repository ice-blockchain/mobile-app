// SPDX-License-Identifier: ice License 1.0

import {DISTRIBUTION_KYC_STEP} from '@api/tokenomics/constants';
import {SocialKycStepNumber} from '@api/tokenomics/types';
import {navigate} from '@navigation/utils';
import {isDistributionKyc} from '@screens/SocialKycFlow/utils';
import {
  distributionXPostLinkSelector,
  dynamicDistributionDataSelector,
} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {useCallback, useRef} from 'react';
import {Linking, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export function useOnContinue({
  onConfirm,
  kycStep,
}: {
  kycStep: SocialKycStepNumber;
  onConfirm: () => void;
}) {
  const tappedTheLinkRef = useRef(false);
  const distributionXPostLink = useSelector(distributionXPostLinkSelector);
  const dynamicDistributionData = useSelector(dynamicDistributionDataSelector);

  const isDistributionFlow = isDistributionKyc(kycStep);
  const onStepOne = useCallback(() => {
    tappedTheLinkRef.current = true;
    const dynamicDistributionXPostLink = dynamicDistributionData?.find(
      data => data.step === kycStep,
    )?.xPostLink;
    const link =
      kycStep === DISTRIBUTION_KYC_STEP
        ? distributionXPostLink
        : dynamicDistributionXPostLink;
    if (link) {
      Linking.openURL(link);
    }
  }, [distributionXPostLink, dynamicDistributionData, kycStep]);
  const onContinue = useCallback(() => {
    if (isDistributionFlow && !tappedTheLinkRef.current) {
      navigate({
        name: 'PopUp',
        key: 'social-kyc-instructions-popup',
        params: {
          title: t('social_kyc.instructions_step.x.pop_up.title'),
          message: t('distribution_kyc.instructions_step.x.pop_up.description'),
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
    } else {
      navigate({
        name: 'PopUp',
        key: 'social-kyc-instructions-popup',
        params: {
          title: t('social_kyc.instructions_step.x.pop_up.title'),
          message: t(
            isDistributionFlow
              ? 'distribution_kyc.instructions_step.x.pop_up.description2'
              : 'social_kyc.instructions_step.x.pop_up.description',
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
    }
  }, [isDistributionFlow, onConfirm]);

  return {onContinue, onStepOne};
}

const styles = StyleSheet.create({
  closeButton: {
    width: '70%',
  },
});
