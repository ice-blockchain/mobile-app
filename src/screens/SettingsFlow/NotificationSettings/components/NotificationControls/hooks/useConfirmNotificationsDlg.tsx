// SPDX-License-Identifier: ice License 1.0

import {
  DEFAULT_DIALOG_NO_BUTTON,
  DEFAULT_DIALOG_YES_BUTTON,
} from '@components/Buttons/PopUpButton';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {t} from '@translations/i18n';
import {useDispatch} from 'react-redux';

export const useConfirmNotificationsDlg = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  return {
    openConfirmationDlg: () => {
      navigation.navigate({
        name: 'PopUp',
        key: 'confirm-notifications-popup',
        params: {
          title: t('settings.notifications_title'),
          message: t('settings.notifications.enable_prompt'),
          buttons: [
            DEFAULT_DIALOG_NO_BUTTON,
            {
              ...DEFAULT_DIALOG_YES_BUTTON,
              onPress: () => {
                dispatch(
                  PermissionsActions.GET_PERMISSIONS.START.create(
                    'pushNotifications',
                  ),
                );
              },
            },
          ],
        },
      });
    },
  };
};
