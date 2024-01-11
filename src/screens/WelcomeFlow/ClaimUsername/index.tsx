// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CommonInput} from '@components/Inputs/CommonInput';
import {COLORS} from '@constants/colors';
import {isLightDesign} from '@constants/featureFlags';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {FinalizeRegistrationStep} from '@screens/Templates/FinalizeRegistrationStep';
import {BigHeader} from '@screens/Templates/FinalizeRegistrationStep/components/BigHeader';
import {Info} from '@screens/Templates/FinalizeRegistrationStep/components/Info';
import {useClaimUsername} from '@screens/WelcomeFlow/ClaimUsername/hooks/useClaimUsername';
import {ManIcon} from '@svg/ManIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const ClaimUsername = () => {
  const {
    username,
    error,
    isLoading,
    isUsernameUpdated,
    onChangeUsername,
    onSubmit,
    goBack,
  } = useClaimUsername();

  return (
    <FinalizeRegistrationStep
      title={t('claimUsername.title')}
      showBackButton={true}
      onBackPress={goBack}
      header={
        <BigHeader
          title={t('claimUsername.title')}
          description={
            isLightDesign
              ? t('override.claimUsername.description')
              : t('claimUsername.description')
          }
          progressPercentage={0}
        />
      }
      imageSource={require('./assets/images/claim-username.png')}
      input={
        <CommonInput
          label={t('claimUsername.inputPlaceholder')}
          onChangeText={onChangeUsername}
          icon={
            <ManIcon
              color={COLORS.secondary}
              width={rem(16)}
              height={rem(16)}
            />
          }
          value={username ?? ''}
          errorText={error}
          validated={isUsernameUpdated}
        />
      }
      info={
        <Info
          text={
            <Text style={styles.infoText}>
              {t('claimUsername.note_part1')}
              {'\n'}
              {t('claimUsername.note_part2')}{' '}
              <Text style={styles.infoExampleText}>
                {t('claimUsername.note_example')}
              </Text>
            </Text>
          }
          textStyle={styles.infoStyle}
        />
      }
      button={
        <PrimaryButton
          text={t('button.next_step')}
          onPress={onSubmit}
          loading={isLoading}
          disabled={isLoading || !!error || !username}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  infoText: {
    ...font(13, 18, 'regular', 'secondary'),
  },
  infoExampleText: {
    ...font(13, 18, 'regular', 'catalinaBlue'),
  },
  infoStyle: {
    marginRight: SCREEN_SIDE_OFFSET,
  },
});
