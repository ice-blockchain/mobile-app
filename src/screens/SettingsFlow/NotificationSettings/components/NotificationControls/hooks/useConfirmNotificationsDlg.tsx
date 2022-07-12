// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  DEFAULT_CONFIRM_NO_BUTTON,
  DEFAULT_CONFIRM_YES_BUTTON,
} from '@screens/Dialogs/Confirm';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {t} from '@translations/i18n';
import {useDispatch} from 'react-redux';

export const useConfirmNotificationsDlg = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const dispatch = useDispatch();
  return {
    openConfirmationDlg: () => {
      navigation.navigate('Confirm', {
        title: t('settings.notifications_title'),
        subtitle: t('settings.notifications.enable_prompt'),
        buttons: [
          {
            ...DEFAULT_CONFIRM_YES_BUTTON,
            onPress: () => {
              dispatch(
                PermissionsActions.GET_PERMISSIONS.START.create(
                  'pushNotifications',
                ),
              );
            },
          },
          DEFAULT_CONFIRM_NO_BUTTON,
        ],
      });
    },
  };
};
