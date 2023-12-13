// SPDX-License-Identifier: ice License 1.0

import {navigate} from '@navigation/utils';
import {ethDistributionXPostLinkSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import {useCallback, useRef} from 'react';
import {Linking, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export function useOnContinue({
  onConfirm,
  isDistributionFlow,
}: {
  isDistributionFlow: boolean;
  onConfirm: () => void;
}) {
  const tappedTheLinkRef = useRef(false);
  const ethDistributionXPostLink = useSelector(
    ethDistributionXPostLinkSelector,
  );
  const onStepOne = useCallback(() => {
    if (isDistributionFlow) {
      if (ethDistributionXPostLink) {
        Linking.openURL(ethDistributionXPostLink);
      }
      tappedTheLinkRef.current = true;
    }
  }, [ethDistributionXPostLink, isDistributionFlow]);
  const onContinue = useCallback(() => {
    if (isDistributionFlow && !tappedTheLinkRef.current) {
      navigate({
        name: 'PopUp',
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
        params: {
          title: t('social_kyc.instructions_step.x.pop_up.title'),
          message: t('social_kyc.instructions_step.x.pop_up.description'),
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
