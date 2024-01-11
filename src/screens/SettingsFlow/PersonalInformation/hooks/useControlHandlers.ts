// SPDX-License-Identifier: ice License 1.0

import {User} from '@api/user/types';
import {DEFAULT_DIALOG_NO_BUTTON} from '@components/Buttons/PopUpButton';
import {CroppedImage} from '@hooks/useActionSheetUpdateAvatar';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useUserDraft} from '@screens/SettingsFlow/PersonalInformation/hooks/useUserDraft';
import {t} from '@translations/i18n';
import {getFilenameFromPath} from '@utils/file';
import {useCallback} from 'react';

export const useControlHandlers = (user: User) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();

  const {userDraft, setUserDraft, changes} = useUserDraft(user);

  const onChangeUsername = useCallback(
    (username: string) => setUserDraft(draft => ({...draft, username})),
    [setUserDraft],
  );

  const onChangeFirstName = useCallback(
    (firstName: string) => setUserDraft(draft => ({...draft, firstName})),
    [setUserDraft],
  );

  const onChangeLastName = useCallback(
    (lastName: string) => setUserDraft(draft => ({...draft, lastName})),
    [setUserDraft],
  );

  const onPhonePress = useCallback(
    () => navigation.navigate('ModifyPhoneNumber'),
    [navigation],
  );

  const onEmailPress = useCallback(() => {
    navigation.navigate({
      name: 'PopUp',
      key: 'confirm-update-email-popup',
      params: {
        title: t('settings.update_email_confirmation_title'),
        message: t('settings.update_email_confirmation_subtitle'),
        buttons: [
          DEFAULT_DIALOG_NO_BUTTON,
          {
            text: t('button.yes'),
            onPress: () => {
              navigation.navigate('ModifyEmail');
            },
          },
        ],
      },
    });
  }, [navigation]);

  const onCountryPress = useCallback(() => {
    navigation.navigate('CountrySelect', {
      onSelect: country => {
        setUserDraft(draft => ({
          ...draft,
          country: country.isoCode,
          city: user.country === country.isoCode ? user.city : '',
        }));
      },
    });
  }, [navigation, setUserDraft, user.city, user.country]);

  const onChangeCity = useCallback(
    (city: string) => setUserDraft(draft => ({...draft, city})),
    [setUserDraft],
  );

  const onChangeProfileImage = useCallback(
    (image: CroppedImage | null) =>
      image
        ? setUserDraft(draft => ({
            ...draft,
            profilePicture: {
              uri: image.path,
              name: getFilenameFromPath(image.path),
              type: image.mime,
            },
          }))
        : setUserDraft(draft => ({
            ...draft,
            resetProfilePicture: true,
          })),
    [setUserDraft],
  );

  return {
    user,
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
  };
};
