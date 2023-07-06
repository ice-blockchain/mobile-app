// SPDX-License-Identifier: ice License 1.0

import {PrimaryButton} from '@components/Buttons/PrimaryButton';
import {CommonInput} from '@components/Inputs/CommonInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {UserAvatarHeader} from '@components/UserAvatarHeader';
import {COLORS} from '@constants/colors';
import {isChangePhoneNumberEnabled} from '@constants/featureFlags';
import {commonStyles} from '@constants/styles';
import {Header} from '@navigation/components/Header';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {useControlHandlers} from '@screens/SettingsFlow/PersonalInformation/hooks/useControlHandlers';
import {useUpdateAccount} from '@screens/SettingsFlow/PersonalInformation/hooks/useUpdateAccount';
import {useValidateUsername} from '@screens/SettingsFlow/PersonalInformation/hooks/useValidateUsername';
import {unsafeUserSelector} from '@store/modules/Account/selectors';
import {EmailIcon} from '@svg/EmailIcon';
import {LocationIcon} from '@svg/LocationIcon';
import {PersonIcon} from '@svg/PersonIcon';
import {PersonWithPenIcon} from '@svg/PersonWithPenIcon';
import {PhoneIcon} from '@svg/PhoneIcon';
import {WorldIcon} from '@svg/WorldIcon';
import {isRTL, t} from '@translations/i18n';
import {getCountryByCode} from '@utils/country';
import {formatPhoneNumber} from '@utils/phoneNumber';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const PersonalInformation = memo(() => {
  useFocusStatusBar({style: 'dark-content'});
  const tabbarOffset = useBottomTabBarOffsetStyle();

  const user = useSelector(unsafeUserSelector);

  const {
    userDraft,
    changes,
    onChangeUsername,
    onChangeFirstName,
    onChangeLastName,
    onPhonePress,
    onEmailPress,
    onCountryPress,
    onChangeCity,
    onChangeProfileImage,
  } = useControlHandlers(user);

  const {
    validateUsernameError,
    validateUsernameLoading,
    validateUsernameSuccess,
  } = useValidateUsername(user, userDraft.username);

  const {updateAccount, isUpdateLoading} = useUpdateAccount(userDraft);

  return (
    <KeyboardAvoider
      keyboardVerticalOffset={-tabbarOffset.current.paddingBottom + rem(20)}>
      <Header title={t('personal_information.title')} />
      <ScrollView
        contentContainerStyle={tabbarOffset.current}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <UserAvatarHeader onChange={onChangeProfileImage} />
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <CommonInput
            label={t('personal_information.username')}
            onChangeText={onChangeUsername}
            value={userDraft.username ?? ''}
            containerStyle={styles.inputContainer}
            style={styles.input}
            loading={validateUsernameLoading}
            errorText={validateUsernameError}
            validated={validateUsernameSuccess}
            icon={
              <PersonIcon
                width={rem(24)}
                height={rem(16)}
                color={COLORS.secondary}
              />
            }
          />
          <CommonInput
            label={t('personal_information.first_name')}
            textContentType="name"
            onChangeText={onChangeFirstName}
            value={userDraft.firstName ?? ''}
            containerStyle={styles.inputContainer}
            style={styles.input}
            icon={<PersonWithPenIcon width={rem(24)} height={rem(24)} />}
          />
          <CommonInput
            label={t('personal_information.last_name')}
            textContentType="familyName"
            onChangeText={onChangeLastName}
            editable={!isUpdateLoading}
            value={userDraft.lastName ?? ''}
            containerStyle={styles.inputContainer}
            style={styles.input}
            icon={<PersonWithPenIcon width={rem(24)} height={rem(24)} />}
          />
          {isChangePhoneNumberEnabled && (
            <CommonInput
              label={t('personal_information.phone')}
              editable={!isUpdateLoading}
              value={formatPhoneNumber(user.phoneNumber ?? '')}
              containerStyle={styles.inputContainer}
              style={styles.input}
              icon={<PhoneIcon width={rem(24)} height={rem(19)} />}
              onChange={onPhonePress}
            />
          )}
          <CommonInput
            label={t('personal_information.email')}
            editable={!isUpdateLoading}
            value={user.email ?? ''}
            containerStyle={styles.inputContainer}
            style={styles.input}
            icon={<EmailIcon width={rem(24)} height={rem(14)} />}
            onChange={onEmailPress}
            numberOfLines={1}
          />
          <CommonInput
            label={t('personal_information.country')}
            editable={!isUpdateLoading}
            value={
              userDraft.country
                ? getCountryByCode(userDraft.country).current?.name ?? ''
                : ''
            }
            containerStyle={styles.inputContainer}
            style={styles.input}
            icon={<WorldIcon width={rem(24)} height={rem(16)} />}
            onChange={onCountryPress}
          />
          <CommonInput
            label={t('personal_information.city')}
            textContentType="addressCity"
            onChangeText={onChangeCity}
            editable={!isUpdateLoading}
            value={userDraft.city ?? ''}
            containerStyle={styles.inputContainer}
            style={styles.input}
            icon={<LocationIcon width={rem(24)} height={rem(24)} />}
          />
          <PrimaryButton
            text={t('button.save')}
            style={styles.button}
            onPress={updateAccount}
            loading={isUpdateLoading}
            disabled={
              !changes.length ||
              (changes.includes('username') && !validateUsernameSuccess)
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoider>
  );
});

const styles = StyleSheet.create({
  card: {
    paddingTop: rem(8),
  },
  inputContainer: {
    marginTop: rem(16),
    marginHorizontal: rem(16),
  },
  input: {
    // fix for RTL languages
    flex: isRTL ? 0 : 1,
    ...font(16, 21, 'medium', 'primaryDark'),
  },
  button: {
    marginTop: rem(27),
    marginHorizontal: rem(66),
  },
});
