// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CommonInput} from '@components/Inputs/CommonInput';
import {COLORS} from '@constants/colors';
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
    onBack,
  } = useWhoInvitedYou();

  return (
    <FinalizeRegistrationStep
      title={t('whoInvitedYou.title')}
      showBackButton={true}
      onBackPress={onBack}
      header={
        <BigHeader
          title={t('whoInvitedYou.title')}
          description={t('whoInvitedYou.description')}
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
          style={styles.input}
        />
      }
      info={
        <Info
          text={
            <Text style={styles.infoText}>
              {t('whoInvitedYou.dontHaveInvitationCode', {value: 25})}
            </Text>
          }
          textStyle={styles.infoTextContainer}
          tooltip={t('whoInvitedYou.dontHaveCodeTip')}
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
  input: {
    // fix for RTL languages
    textAlign: 'left',
  },
});
