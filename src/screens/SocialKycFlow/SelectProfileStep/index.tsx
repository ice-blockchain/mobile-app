// SPDX-License-Identifier: ice License 1.0

import {SocialKycStepNumber} from '@api/tokenomics/types';
import {ActivityIndicator} from '@components/ActivityIndicator';
import {PopUpButton} from '@components/Buttons/PopUpButton';
import {INDICATOR_SIDE_DIMENSION} from '@components/Buttons/PrimaryButton';
import {COLORS} from '@constants/colors';
import {commonStyles, SCREEN_SIDE_OFFSET, windowWidth} from '@constants/styles';
import {useOnHardwareBack} from '@hooks/useOnHardwareBack';
import {Images} from '@images';
import {Header} from '@navigation/components/Header';
import {BUTTON_HEIGHT} from '@screens/SocialKycFlow/constants';
import {kycStepToTranslationsPathPrefix} from '@screens/SocialKycFlow/utils';
import {SocialKycActions} from '@store/modules/SocialKyc/actions';
import {getSocialKycRepostTextStatusSelector} from '@store/modules/SocialKyc/selectors';
import {SocialKycMethod} from '@store/modules/SocialKyc/types';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  updateStepPassed: () => void;
  socialKycMethod: SocialKycMethod | null;
  kycStep: SocialKycStepNumber;
  onGoBack: () => void;
  onSkip: (skipKYCStep?: SocialKycStepNumber) => void;
};

export function SelectProfileStep({
  updateStepPassed,
  socialKycMethod,
  kycStep,
  onGoBack,
  onSkip,
}: Props) {
  const dispatch = useDispatch();

  const onContinue = () => {
    if (socialKycMethod) {
      dispatch(
        SocialKycActions.GET_SOCIAL_KYC_REPOST_TEXT.START.create({
          socialKycMethod,
          kycStep,
        }),
      );
    }
  };
  const getSocialKycRepostTextStatus = useSelector(
    getSocialKycRepostTextStatusSelector,
  );
  useEffect(() => {
    if (getSocialKycRepostTextStatus === 'SUCCESS') {
      updateStepPassed();
    } else if (getSocialKycRepostTextStatus === 'SKIPPABLE_ERROR') {
      onSkip();
    }
  }, [getSocialKycRepostTextStatus, onSkip, updateStepPassed]);
  const isLoading = getSocialKycRepostTextStatus === 'LOADING';

  useOnHardwareBack({callback: onGoBack});

  const translationsPrefix = kycStepToTranslationsPathPrefix(kycStep);

  return (
    <View style={commonStyles.flexOne}>
      <Header
        color={COLORS.primaryDark}
        title={t('social_kyc.header')}
        backgroundColor={'transparent'}
        onGoBack={onGoBack}
      />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={Images.badges.socialKyc.start} />
        </View>
        <Text style={styles.title}>
          {t(`${translationsPrefix}.select_method_step.title`)}
        </Text>
        <Text style={styles.description}>
          {t(`${translationsPrefix}.select_method_step.description`)}
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.buttonsContainer}>
          <PopUpButton
            text={t('button.not_now')}
            preset={'outlined'}
            style={styles.button}
            onPress={() => onSkip(kycStep)}
          />
          <View>
            <PopUpButton
              text={isLoading ? '' : t('button.continue')}
              disabled={!socialKycMethod}
              style={[socialKycMethod ? styles.button : styles.disabledButton]}
              onPress={isLoading ? undefined : onContinue}
            />
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  theme="dark-content"
                  style={styles.indicator}
                />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

export const FOOTER_PADDING_HORIZONTAL = rem(28);
export const BUTTON_WIDTH =
  windowWidth / 2 - FOOTER_PADDING_HORIZONTAL - rem(16);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    paddingTop: rem(20),
  },
  title: {
    paddingTop: SCREEN_SIDE_OFFSET,
    ...font(24, 34, 'black', 'primaryDark', 'center'),
  },
  description: {
    paddingTop: SCREEN_SIDE_OFFSET,
    paddingHorizontal: rem(48),
    ...font(14, 20, 'medium', 'secondary', 'center'),
  },
  footerContainer: {
    paddingHorizontal: FOOTER_PADDING_HORIZONTAL,
    paddingBottom: rem(40),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
  },
  disabledButton: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: COLORS.primaryDark,
    opacity: 0.5,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: INDICATOR_SIDE_DIMENSION,
    height: INDICATOR_SIDE_DIMENSION,
  },
});
