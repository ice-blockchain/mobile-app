// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CommonInput} from '@components/Inputs/CommonInput';
import {COLORS} from '@constants/colors';
import {isLightDesign, isLiteTeam} from '@constants/featureFlags';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {Info} from '@screens/Templates/FinalizeRegistrationStep/components/Info';
import {QRCodeButton} from '@screens/WelcomeFlow/WhoInvitedYou/components/QRCodeButton';
import {useWhoInvitedYou} from '@screens/WelcomeFlow/WhoInvitedYou/hooks/useWhoInvitedYou';
import {ManIcon} from '@svg/ManIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const WhoInvitedYou = () => {
  const {
    refUsername,
    error,
    isLoading,
    isReferralUpdated,
    onChangeRefUsername,
    onSubmit,
    goBack,
  } = useWhoInvitedYou();

  return (
    <FinalizeRegistrationStep
      title={t('whoInvitedYou.title')}
      showBackButton={true}
      onBackPress={goBack}
      header={
        <BigHeader
          title={t('whoInvitedYou.title')}
          description={
            isLightDesign
              ? t('override.whoInvitedYou.description')
              : t('whoInvitedYou.description')
          }
          progressPercentage={33}
        />
      }
      imageSource={require('./assets/images/who-invited-you.png')}
      input={
        <CommonInput
          label={t('whoInvitedYou.inputPlaceholder')}
          onChangeText={onChangeRefUsername}
          icon={
            <ManIcon
              color={COLORS.secondary}
              width={rem(16)}
              height={rem(16)}
            />
          }
          value={refUsername}
          errorText={error}
          validated={isReferralUpdated}
          postfix={<QRCodeButton onUsernameDetect={onChangeRefUsername} />}
        />
      }
      info={
        <Info
          text={
            <Text style={styles.infoText}>
              {isLiteTeam
                ? t('override.whoInvitedYou.dontHaveInvitationCode')
                : t('whoInvitedYou.dontHaveInvitationCode')}
            </Text>
          }
          textStyle={styles.infoTextContainer}
          tooltip={t('whoInvitedYou.dontHaveCodeTip')}
          tooltipStyle={styles.tooltipStyle}
        />
      }
      button={
        <PrimaryButton
          text={t('button.complete')}
          onPress={onSubmit}
          loading={isLoading}
          disabled={!!error || !refUsername || isLoading}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  infoText: {
    ...font(13, 18, 'regular', 'secondary'),
  },
  infoTextContainer: {
    marginRight: SCREEN_SIDE_OFFSET,
  },
  tooltipStyle: {
    width: rem(260),
    marginBottom: rem(16),
  },
});
